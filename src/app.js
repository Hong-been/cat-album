import NodesComponent from "./components/Nodes/Nodes.js";
import BreadCrumbComponent from "./components/BreadCrumb/BreadCrumb.js";
import Api from "./api/api.js";

export default class App{
    constructor(root){
        this.root=root;
        this.dataList= [];
        this.api=new Api();
        this.fetchData("");
    }

    render(){
      this.breadCrumb = new BreadCrumbComponent(this.root);
      this.nodeContainer = new NodesComponent(this.root,this.dataList,true,this.path, this.fetchData);
    }

    async fetchData(path){
      try{
        this.dataList = await this.api.fetchDirectory("");
      } catch{
        alert("일시적으로 데이터를 가져올 수 없습니다. 다시 시도해주세요.");
      }
      
      // path로 펫치해서 
      // path를 bread에 전달하고
      // 결과를 Nodes에 전달한다.
      this.render();
    }
}