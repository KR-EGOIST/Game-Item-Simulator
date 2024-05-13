### 깃허브 규칙
|작업 타입|작업 내용|
|:---:|:---:|
|✨ update|해당 파일에 새로운 기능이 생김|
|🎉 add|없던 파일을 생성함, 초기 세팅|
|🐛 bugfix|버그 수정|
|♻️ refactor|코드 리팩토링|
|🩹 fix|코드 수정|
|🚚 move|파일 옮김/정리|
|🔥 del|기능/파일을 삭제|
|🍻 test|테스트 코드를 작성|
|💄 style|CSS 스타일 변경|
|🙈 gitfix|.gitignore 수정|
|🔨 function|function.js 변경(기능추가 등)|

**Goal:  "Node.js와 express를 활용한 나만의 게임 아이템 시뮬레이터 서비스 만들기"**

- **아이템 시뮬레이터란?**
    - 게임 클라이언트에 접속을 할 수 없을 때 현재 나의 게임 아이템 상황 및 다른 사람들의 게임 아이템 상황을 볼 수 있도록 정보를 제공하는 서비스입니다!
    - 다른 유저들은 어느정도 아이템을 갖췄는지 비교도 해볼 수 있고요.
    - 또한, 내가 어떠한 아이템을 갖추면 더 능력치가 좋은지 시뮬레이션을 해볼 수 있죠!
    - 이번 과제에선 이 아이템 시뮬레이터 서비스를 우리가 한 번 만들어보도록 할게요!
- **학습 과제를 끝내고 나면 할 수 있어요!**
    1. Node.js를 이용해서 게임 아이템 제작 시뮬레이션 서비스 백엔드 서버를 구현할 수 있어요.
    2. MongoDB와 mongoose를 이용하여 원하는 데이터를 저장하고 저장한 데이터를 활용할 수 있어요.
    3. Express.js를 기반으로 **CRUD(Create, Read, Update, Delete)** 기능이 포함된 REST API를 만들 수 있어요.
    4. AWS EC2에 Express.js 를 이용한 웹 서비스를 배포할 수 있어요.
    5. 프로젝트에 요구 사항을 토대로 API 리스트를 작성하고, 백엔드 서버를 설계할 수 있어요.
 

🚩 **필수 요구 사항**
0️⃣ 필수 요구 사항: 프로젝트 관리

1. `.env` 파일을 이용해서 민감한 정보(DB 계정 정보, API Key 등)를 관리합니다.
2. `.gitignore` 파일을 생성하여 `.env` 파일과 `node_modules` 폴더가 Github에 올라가지 않도록 설정합니다.
3. `.prettierrc` 파일을 생성하여 일정한 코드 포맷팅을 유지할 수 있도록 설정합니다.

1️⃣ 필수 요구 사항: AWS EC2 배포

- 여러분의 완성된 프로젝트를 **[AWS EC2](https://ap-northeast-2.console.aws.amazon.com/ec2)**에 배포해주세요!
- 배포된 IP 주소를 제출해주세요!


2️⃣ 필수 요구 사항: API 구현하기

1. 캐릭터 생성 API
- 엄밀히 말하면 게임 내의 캐릭터를 불러와야 하지만 저희는 아직 게임을 만들지 않았으니 캐릭터 생성을 하는 API가 필요합니다.
- 캐릭터 명을 **request**에서 전달 받기
    - 이 때, 이미 존재하는 캐릭터 명으로 캐릭터 생성을 하려고 하면 생성을 못하게 해주세요!
    - 사실은 캐릭터 명 말고도 캐릭터에 대한 여러가지 정보를 받아야하지만 여기선 간소화 할게요!
- 캐릭터는 생성할 때 **character_id를 순차적으로 부여해주세요.**
    - 최초 캐릭터 생성 시 캐릭터 ID는 1로 부여하고 그 뒤에 캐릭터 생성하면 캐릭터 ID는 2로 부여
    - MongoDB에서는 인덱스로 ObjectId를 쓰는 것이 기본이지만 여기선 따로 주는 것으로 할게요!
- 캐릭터의 스탯을 다음과 같이 설정해주세요.
    - **health: 500**
    - **power: 100**
    - 캐릭터 스탯은 정말 다양하게 있지만 역시나 최소한으로 간소화하여 관리하도록 하겠습니다!
    - 즉, 우리가 만드는 캐릭터는 HP와 힘 능력만 있는 상태라고 생각하시면 됩니다!
- MongoDB에는 이런식으로 캐릭터 데이터가 저장이 되어있을 것입니다.
```
{
	_id: ObjectId("649b85a52009a26bc6b4f6e9")
	character_id: 321,
	name: "호호아줌마"
	health: 500,
	power: 100
}
```
- 생성 성공 시 캐릭터의 ID를 반드시 response로 꼭 전달해주세요!
2. 캐릭터 삭제 API
    - 삭제할 캐릭터의 ID는 URI의 **parameter**로 전달 받기
        - 예시: `DELETE /api/characters/**321**` ← 321번 캐릭터 삭제! 굵은 글씨가 parameter에요!
3. 캐릭터 상세 조회 API
    - 조회할 캐릭터의 ID는 URI의 **parameter**로 전달 받기
    - 캐릭터 이름, HP, 힘 스탯 및 아이템 목록을 전달해주세요!
    - **response** 예시
```
{
	"name": "호호아줌마",
	"health": 500,
	"power": 100
}
```

4. 아이템 생성 API
    - 아이템 코드, 아이템 명, 아이템 능력을 **request**에서 전달 받기
        - 이 때, 아이템 능력은 JSON 포맷으로 전달해주시면 됩니다.
        - request의 body 예시

```
{
	"item_code": 3,
	"item_name": "파멸의 반지",
	"item_stat": { "health": 20, "power": 2 }
 }
```
