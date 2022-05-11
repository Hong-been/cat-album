
/* https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev
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
    },
 .....
]

// https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/1 호출 시
[
    {
        "id": "5",
        "name": "2021/04",
        "type": "DIRECTORY",
        "filePath": null,
        "parent": {
            "id": "1"
        }
    },
    {
        "id": "19",
        "name": "물 마시는 사진",
        "type": "FILE",
        "filePath": "/images/a2i.jpg",
        "parent": {
            "id": "1"
        }
    }
]

{
  "id":       string // 문자열로 된 Node의 고유값입니다.
  "name":     string // 디렉토리 혹은 파일의 이름입니다. 화면에 표시할 때 사용합니다.
  "type":     string // 파일인지 디렉토리인지 여부입니다. 파일인 경우 FILE, 디렉토리인 경우 DIRECTORY 입니다.
  "filePath": string // 파일인 경우에 존재하는 값입니다. 해당 파일 이미지를 불러오기 위한 경로가 들어있습니다.
  "parent":   object | null {
    "id": string // 해당 Node가 어디에 속하는지 나타내는 값입니다. parent가 null이면 root에 존재하는 파일 / 디렉토리입니다.
  }
}

image(path앞에 /가 있을수도, 없을수도있음. 잘 조합하기)
https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public/${node.filePath}

*/
export default class Api{
    constructor(){
        this.baseUrl="https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";
        this.imageUrl="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";
    }

    async fetchDirectory(path){
        const res = await fetch(`${this.baseUrl}/${path}`,{
            method: "GET",
            mode:"cors",
            cache: "default",
        });

        if(res.ok){
            const data = await res.json();
            return data;
        } else {
            const error = await res.json();
            throw error;
        }
    }

    async fetchFile(path){
        const res = await fetch(`${this.imageUrl}/${path}`,{
            method: "GET",
            mode:"cors",
            cache: "default",
        });

        console.log(res);
    }
}