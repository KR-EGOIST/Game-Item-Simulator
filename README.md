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

🚩**Goal:  "Node.js와 express를 활용한 나만의 게임 아이템 시뮬레이터 서비스 만들기"**

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

5. 아이템 수정 API
- 아이템 코드는 URI의 **parameter**로 전달 받기
- 아이템 명, 아이템 능력을 **request**에서 전달 받기
	- 아이템 생성과 마찬가지로 전달을 해주시면 됩니다.
        - request의 body 예시
```
{
	"item_name": "파멸의 반지_리뉴얼",
	"item_stat": { "health": 30 }
}
```
- 위의 예시대로 아이템 수정을 하면 파멸의 반지 → 파멸의 반지_리뉴얼로 이름이 바뀌었고 HP를 20에서 30으로 올려줍니다. 다만, 기존에 힘 능력을 2를 올려줬던 능력은 사라졌네요.

6. 아이템 목록 조회 API
- 아이템 코드, 아이템 명 내용만 조회
- 아이템 생성 API를 통해 생성된 모든 아이템들이 목록으로 조회가 될 수 있어야 합니다.
- **response** 예시
```
[ 
	{
	  "item_code": 1,
		"item_name": "막대기",
	},
	{
	  "item_code": 2,
		"item_name": "너덜너덜한 고무신",
	},
	{
	  "item_code": 3,
		"item_name": "파멸의 반지_리뉴얼",
	}
]
```
7. 아이템 상세 조회 API
- 아이템 코드를 URI의 **parameter**로 전달 받아 아이템 코드, 아이템 명, 아이템 능력을 조회
- **response** 예시
```
{
	"item_code": 3,
	"item_name": "파멸의 반지",
	"item_stat": { "health": 20, "power": 2 }
}
```


🔥 **도전 요구 사항: 캐릭터에 아이템 실제로 탈/장착해보기!**
- 필수 요구 사항의 API를 전부 구현하면 우리는 다음과 같은 것들을 확인할 수 있어요.
    - 캐릭터 생성 및 삭제가 가능합니다.
    - 해당 캐릭터의 스탯 조회도 가능합니다.
    - 우리가 원하는대로 아이템 도감에 아이템을 추가할 수 있습니다.
    - 이미 추가된 아이템의 정보를 수정하는 것도 가능합니다!
- 하지만, 뭔가 허전하다고 생각드지 않으시나요? 생성된 캐릭터에 아이템을 장착하거나 탈착할 수 있어야 진짜죠! 필수 요구 사항을 구현하신 분들을 위해 추가 미션을 드리겠습니다.


🤔 **Q) 튜터님, 아이템 삭제 기능은 왜 넣지 않으셨나요?** 
**A)**
실제로 게임에서 아이템을 삭제하면 정말 어마어마한 후유증을 야기할 수 있기 때문이에요. **게임에서 아이템은 게임 경제를 구성하는 중요한 요소**이기 때문이죠! 

특정 게임 아이템이 너무 OP라고 생각이 들면 아이템 수정 API를 통해 밸런스 패치를 해주면 문제가 없어지니 삭제 기능은 굳이 필요가 없습니다!


1. 캐릭터의 아이템 정보를 저장할 수 있는 컬렉션 준비하기
    - MongoDB에서 캐릭터의 정보와 아이템의 정보를 각각 저장하는 컬렉션은 이미 있을 겁니다.
    - 하지만, 어떤 캐릭터가 어떤 아이템을 장착하고 있는지에 대한 정보를 관리할 수 있어야 아이템 탈/장착이 가능하겠죠?
2. 캐릭터가 장착한 아이템 목록 조회 API
    - 장착된 아이템 목록을 조회할 캐릭터의 ID를 URI의 **parameter**로 전달 받기
    - **response** 예시
```
[ 
	{
	  "item_code": 1,
		"item_name": "막대기",
	},
	{
	  "item_code": 3,
		"item_name": "파멸의 반지",
	}
]
```
3. 아이템 장착 API
    - 아이템을 장착할 캐릭터의 ID를 URI의 **parameter**로 전달 받기
    - 장착할 아이템 코드를 **request**에서 전달 받기
        - 이 때, 이미 장착한 아이템(아이템 코드 기반으로 구분할 수 있겠죠)을 또 장착하려고 하면 이미 장착된 아이템이라고 장착이 거부되어야 합니다!
    - **매우 중요: 아이템 장착을 하게 되면 캐릭터의 스탯이 올라가야 합니다!**
        - 아이템 장착에 성공하면 기존 캐릭터의 스탯을 직접적으로 변경해주도록 해요.
        - 예시
            - BEFORE.
                - 캐릭터 스탯: { health: 500, power: 100 }
            - “파멸의 반지”를 장착!
            - AFTER.
                - 캐릭터 스탯: { health: **520**, power: **102** }
        - 캐릭터 조회 API를 사용할 때 변경된 캐릭터 스탯으로 나타나야겠죠?
    - 또한, 1번 항목에서 만든 캐릭터-아이템 컬렉션에서 해당 아이템 정보를 추가해야 됩니다.
        - 정상적으로 추가가 되었다면 캐릭터가 장착한 아이템 목록 조회 API에서 추가된 것이 보일겁니다.
4. 아이템 탈착 API
    - 아이템을 장착할 캐릭터의 ID를 URI의 **parameter**로 전달 받기
    - 탈착할 아이템 코드를 **request**에서 전달 받기
        - 이 때, 장착 되지 않은 아이템을 탈착하려고 하면 장착 되어있지 않은 아이템이라고 탈착이 거부되어야 합니다!
    - **매우 중요: 아이템 탈착을 하게 되면 캐릭터의 스탯이 떨어져야 합니다!**
        - 아이템 탈착에 성공하면 기존 캐릭터의 스탯을 직접적으로 변경해주도록 해요.
        - 예시
            - BEFORE.
                - 캐릭터 스탯: { health: 520, power: 102 }
            - “파멸의 반지”를 탈착!
            - AFTER.
                - 캐릭터 스탯: { health: **500**, power: **100** }
        - 캐릭터 조회 API를 사용할 때 변경된 캐릭터 스탯으로 나타나야겠죠?
    - 또한, 1번 항목에서 만든 캐릭터-아이템 컬렉션에서 해당 아이템 정보를 삭제해야 됩니다.
        - 정상적으로 삭제가 되었다면 캐릭터가 장착한 아이템 목록 조회 API에서 없어진 것이 보일겁니다.
