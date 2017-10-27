# 寫一個辦公室內的訂飲料系統

   以下是期望達到的spec

   零. 訂購列表區：
    1.可以看到 (三.)發起訂購頁面  裡送出來的訂購

ㄧ. 參與訂購頁面：
    
1.     訂購項目裡，只能選到菜單裡有的項目
2. 可以看到其他人的訂購項目，也可以自己輸入訂購項目
3.     訂購完之後，會自動帶出小計，並更新總計(項目數量與金額)
4.      在訂單還沒成立前，可以修改自己訂過的紀錄。
5.      訂單在由發起人 成立後，就無法修改自己的紀錄
6.      不管是訂單成立前或成立後，都無法修改別人的紀錄
7.      頁面呈現時，會帶出本次是訂購哪一家店的飲料或便當
8.  如果當初在建立這家店有上傳菜單圖片的話，使用者可以按下菜單圖示，就會跳出一個視窗讓使用者可以
      看這些菜單圖片
9. 右邊有一個real time的留言板 , 可以即時地看到其他人對於這次訂購的留言


二.  新增店家頁面
~~
1. 可以讓人上傳這家店的菜單圖檔 , ＵＩ介面上最好可以用HTML5 drag and drop的。
2.      可以讓人建立這家店的產品選項    
~~

二-1. 編輯店家頁面

       1.可以讓人update這家店的產品選項 (需再考慮權限問題)

三. 發起訂購頁面
1.   可以從 (二.) 新增店家頁面   裡新增過的店家裡選擇店家。
2.   可以設定基本限制 , 例如一人只能訂購幾個，並且在(ㄧ.)參與訂購頁面  會跟著套用這些限制
3. 設定好之後，在(零.)訂購列表區   就能看到這筆訂購項目
     
四. 訂購管理頁面：
     1.這一頁只有發起訂購的人能夠進來(通常應該會是負責打電話訂購  跟  收錢的那個人)
2. 不管是在訂單成立前或成立後，都能夠對訂單裡的訂購項目做  新, 刪, 修, 查的動作。
3.        新, 刪, 修, 查  的操作後  畫面上對應的欄位會跟著變動
4.   要有管理收錢的功能(這個人的錢收到了沒，收了多少, 要找多少 )
5.    要有一個訂購資料封存的按鈕，這個按鈕按下去之後，就無法再編輯，只能查看(整個訂購流程完全結束，大家都吃飽了之後在按  的按鈕)   
     6.  (optional) 本次訂購會有一個基本的統計dash board，上面可能有圓餅圖, 長條圖... etc

五.  登入頁面：
1.      如果是在自己公司內部使用，就發起訂購的人跟 訂購的人用同一組帳號即可，發起訂購的人才會用密碼登入，因為要可以用來判斷能不能進到   (四.) 訂購管理頁面

    以上所有的操作都會寫入到DB裡，之後可以再查詢出來。  (可能除了 (ㄧ. )裡的  即時留言以外)

table   訂單, 店家, 會員, 團,  訂購限制, 找零紀錄

user身份：  發起訂購人    與   參與訂購人

有刪除線的是目前已經做完的

DEMO網址：

