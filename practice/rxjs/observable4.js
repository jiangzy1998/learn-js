class DataSource {
    constructor() {
      let i = 0;
      this._id = setInterval(() => this.emit(i++), 200); // 创建定时器
    }
    
    emit(n) {
      const limit = 10;  // 设置数据上限值
      if (this.ondata) {
        this.ondata(n);
      }
      if (n === limit) {
        if (this.oncomplete) {
          this.oncomplete();
        }
        this.destroy();
      }
    }
    
    destroy() { // 清除定时器
      clearInterval(this._id);
    }
}

class SafeObserver {
    constructor(destination){
        this.destination = destination;
    }

    next(value){
        if(!this.isUnsubscribed && this.destination.next){
            try{
                this.destination.next(value);
            }catch(err){
                this.unsubscribe();
                throw err;
            }
        }
    }

    error(err){
        if(!this.isUnsubscribed && this.destination.error){
            try{
                this.destination.error(err);
            }catch(e2){
                this.unsubscribe();
                throw e2;
            }
            this.unsubscribe();
        }
    }

    complete(){
        if(!this.isUnsubscribed  && this.destination.complete){
            try{
                this.destination.complete();
            }catch(err){
                this.unsubscribe();
                throw err;
            }
            this.unsubscribe();
        }
    }

    unsubscribe(){
        this.isUnsubscribed=true;
        if(this.unsub){
            this.unsub();
        }
    }
}

class Observable{
    constructor(_subscribe){
        this._subscribe = _subscribe;
    }

    subscribe(observer){
        const safeObserver = new SafeObserver(observer);
        safeObserver.unsub = this._subscribe(safeObserver);
        return safeObserver.unsubscribe.bind(safeObserver);
    }
}

function map(source, project){
    return new Observable((observer)=>{
        const mapObserver={
            next:(x)=>observer.next(project(x)),
            error:(err) => observer.error(err),
            complete:() => observer.complete()
        };
        return source.subscribe(mapObserver);
    })
}

const myObservable = new Observable((observer)=>{
    const datasource = new DataSource();
    datasource.ondata = (e) => observer.next(e);
    datasource.onerror = (err) => observer.error(err);
    datasource.oncomplete = () => observer.complete();
    
    return () => datasource.destroy();
})



const unsub = map(myObservable, (x)=> x+x).subscribe({
    next(x) { 
        console.log(x); 
    },
    error(err) { 
        console.error(err); 
    },
    complete() { console.log('done')}
})

