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

function myObservable(observer){
    const safeObserver = new SafeObserver(observer);
    const datasource = new DataSource();
    datasource.ondata = (e) => safeObserver.next(e);
    datasource.onerror = (err) => safeObserver.error(err);
    datasource.oncomplete = () => safeObserver.complete();

    safeObserver.unsub = () => { // 为SafeObserver对象添加unsub方法
        datasource.destroy();
    };

    // 绑定this上下文，并返回unsubscribe方法
    return safeObserver.unsubscribe.bind(safeObserver); 
}

const unsub = myObservable({
    next(x) { console.log(x); },
    error(err) { console.error(err); },
    complete() { console.log('done')}
});