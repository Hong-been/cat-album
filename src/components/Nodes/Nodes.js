/*
[
  {
  "id": "1",
  "name": "노란고양이",
  "type": "DIRECTORY",
  "filePath": null,
  "parent": null
  },
  {
  "id": "3",
  "name": "까만고양이",
  "type": "DIRECTORY",
  "filePath": null,
  "parent": null
  },]
*/
import Component from "../component.js";
import NodeComponent from "../Node/Node.js";

export default class NodesComponent extends Component{
    constructor(root,dataList,isRoot,currentPath, fetchCallback){
        super(`
        <div class="Nodes"></div>
        `)
        root.appendChild(this.element);

        this.dataList = dataList;
        this.isRoot=isRoot;
        this.currentPath=currentPath;
        this.fetchCallback = fetchCallback;
        this.render();
    }

    render(){
        const handleFileClick=(fileName)=>{
            // fileName으로 이미지 모달 띄우기
        }

        const handleDirectoryClick=(DirName)=>{
            // DirName으로 펫치하긔
            this.fetchCallback(DirName);
        }

        const handlePrevClick=()=>{
            // currentPath 에서 마지막 /날리고 펫치하긔
            const prevPath = this.currentPath.split("/").slice(0,-1).join("");
            this.fetchCallback(prevPath);
        }

        if(!this.isRoot){
            const node = new NodeComponent("PREV",null,handlePrevClick);
            node.attachTo("afterbegin",this.element);
        }

        this.dataList?.forEach((data)=>{
            if(data.type === "DIRECTORY"){
                const node = new NodeComponent("DIRECTORY",data,handleDirectoryClick);
                node.attachTo("beforeend",this.element);
            }else if(data.type === "FILE"){
                const node = new NodeComponent("FILE",data,handleFileClick);
                node.attachTo("beforeend",this.element);
            }else{
                throw Error("data type mismatched.")
            }
        })
    }

    
}
