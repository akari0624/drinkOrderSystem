# 寫一個辦公室內的訂飲料系統

## [目前上線網址](https://morrisctech.com/drink/)


## 以下是期望達到的spec

### 零. 訂購列表區：
- [x] 可以看到 (三.)發起訂購頁面  裡送出來的訂購

### ㄧ. 參與訂購頁面：

- [x] 參與訂購前必須先做Facebook OAuth登入，以取得使用者ID與顯示名稱
- [x] 訂購項目裡，只能選到菜單裡有的項目
- [x] 可以看到其他人的訂購項目，也可以自己輸入訂購項目
- [ ] 訂購完之後，會自動帶出小計，並更新總計(項目數量與金額)
- [ ] 在訂單還沒成立前，可以修改自己訂過的紀錄。
- [ ] 訂單在由發起人 成立後，就無法修改自己的紀錄
- [ ] 不管是訂單成立前或成立後，都無法修改別人的紀錄
- [x] 頁面呈現時，會帶出本次是訂購哪一家店的飲料或便當
- [x] 如果當初在建立這家店有上傳菜單圖片的話，使用者可以按下菜單圖示，就會跳出一個視窗讓使用者可以看這些菜單圖片
- [x] 右邊有一個real time的留言板 , 可以即時地看到其他人對於這次訂購的留言,或是誰訂購了ＸＸＸ... 之類的事


### 二.  新增店家頁面

- [x] 新增店家頁面前必須先做Facebook OAuth登入，以取得使用者ID與顯示名稱
- [x] 可以讓人上傳這家店的菜單圖檔 , ＵＩ介面上最好可以用HTML5 drag and drop的。
- [x] 可以讓人建立這家店的產品選項    


### 二-1. 編輯店家頁面

- [ ] 可以讓人update這家店的產品選項 (需再考慮權限問題)

### 三. 發起訂購頁面
- [x] 進入這個頁面前必須先做Facebook OAuth登入，以取得使用者ID與顯示名稱
- [x] 可以從 (二.) 新增店家頁面   裡新增過的店家裡選擇店家。
- [ ] 可以設定基本限制 , 例如一人只能訂購幾個，並且在(ㄧ.)參與訂購頁面  會跟著套用這些限制
- [x] 設定好之後，會產生一個加入訂購的URL，使用者可以傳送給別人這個URL，進入這個URL的人就能加入訂購，即為:  (ㄧ.) 參與訂購頁面
     
### 四. 訂購管理頁面：
- [ ] 這一頁只有發起訂購的人能夠進來(通常應該會是負責打電話訂購  跟  收錢的那個人)
- [ ] 不管是在訂單成立前或成立後，都能夠對訂單裡的訂購項目做  新, 刪, 修, 查的動作。
- [ ] 新, 刪, 修, 查  的操作後  畫面上對應的欄位會跟著變動
- [ ] 要有管理收錢的功能(這個人的錢收到了沒，收了多少, 要找多少 )
- [ ] 要有一個訂購資料封存的按鈕，這個按鈕按下去之後，就無法再編輯，只能查看(整個訂購流程完全結束，大家都吃飽了之後在按  的按鈕)
- [ ] 本次訂購會有一個基本的統計dash board，上面可能有圓餅圖, 長條圖... etc

### 五.  登入頁面：
- [x] 使用Facebook OAuth登入，以取得使用者ID與顯示名稱。
- [ ] 承上，然後就可以用ID來判斷能不能進到   (四.) 訂購管理頁面。

#### 以上所有的操作都會寫入到DB裡，之後可以再查詢出來。  (可能除了 (ㄧ. )裡的  即時留言以外)

## table  
訂單, 店家, 會員, 團,  訂購限制, 找零紀錄

## user身份  
發起訂購人    與   參與訂購人

##  目標瀏覽器 
chrome 60(  2017/08 released )  以後

## 使用到/練習到 的dependencies


- 前端 react +  redux - SPA
- 前端dependencies : webpack, react-router-dom...
- CSS solution: [styled-components](https://github.com/styled-components/styled-components)
- UI components套件: [reactstrap](https://github.com/reactstrap/reactstrap)

- 後端 node.js , express ~~(或koa)~~ , ~~[SOCKET.IO](https://socket.io/) or~~ [ws](https://github.com/websockets/ws), mongoDB  
 ~~(或JAVA式後端：JDK8, Tomcat8, JAVA webSocket,   mongoDB,
 Spring MVC  or Jersey)~~, JSON Web Token

- 重點是要練習寫rest式的後端   跟  使用noSQL式的DB

## 前端的react+redux 與webpack的配置
最一開始時的基底是使用Stephen Grider的 [ReduxSimpleStarter](https://github.com/StephenGrider/ReduxSimpleStarter) , 感謝Stephen老師  [他在udemy上的react+redux課程](https://www.udemy.com/react-redux/learn/v4/overview)真的很棒！！



