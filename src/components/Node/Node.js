/*
type 3개중에 한개로 렌더링.
누르면 각각 다른 작업 수행.
*/
import Component from "../component.js";

export default class NodeComponent extends Component{
    constructor(type,data, onClick){
        super(`<div class="Node"></div>`);

        this.element.addEventListener("click",()=>{
            onClick(data.id);
        });
        this.title=data.name;

        switch(type){
            case "FILE":
                this.element.innerHTML=`
                    <img src="./assets/file.png" alt="사진"></img>
                    <div class="title">${this.title}</div>`;
                break;
            case "DIRECTORY":
                this.element.innerHTML=`
                    <img src="./assets/directory.png" alt="파일"></img>
                    <div class="title">${this.title}</div>`;
                break;
            default: 
                throw Error("Node type mismatched.");
        }       
    }
}

