# Web-Canvas

![](https://i.imgur.com/tI14dee.png) ![](https://i.imgur.com/BxtOE7L.png) ![](https://i.imgur.com/wainyDW.png)


| **Basic components**                             |  
| :----------------------------------------------- |
| Basic control tools: Pencil                      |
| Change size                                      |
| Cursor icon                                      |
| Text input                                       |
| Refresh button                                   |
| **Advanced tools**                               |
| Different brush shapes                           |
| Un/Re-do button                                  |
| Image tool: Upload                               |
| Download                                         |
| Background                                       |

---

## How to use 

#### click the Button next to the canvas:
![](https://i.imgur.com/aC6hpGY.png)![](https://i.imgur.com/FwM7Cjr.png)


- [ ] click **color** or **upload** some images as your **background**.
- [ ] color you chose would indicate on the color button, click the canvas and the color of background wlll change immediately. 
- [ ] the order of the upload images is left ro right and up to down.
- [x] **click again the button to save your space!**
- [ ] click **pencil**, **circle**, **rectangle** or **triangle** to design your own picture!
- [ ] by using text, you may have to click the position you want put the text then type in the small box, and choose the font size and font style you want.
- [ ] all of them, includng eraser can adjust size from 1 to 50.
- [ ] click download to save your work!
- [ ] upload the picture you didn't finish yet the next time you come back!

## Function description

  #### 分為下列八個 j s 檔:
* **canvas.js**: 監聽及接收滑鼠與鍵盤事件，實現利用pencil, circle等圖形描繪的功能。
    * text 點選要打字的位置後，利用鍵盤監聽事件實現backspace與enter修改文字及換行的功能。
        點選其他處的同時，取消監聽，結束打字。
    * 圖形皆透過fill button分別fill與stroke的狀態。
    * change_mode: 透過HTML的id辨別對應的button會促發的事件(函數)。
* **change_button.js**: 
    * 透過**更改button狀態來收合空間**。**pencil**, **eraser**, **tex**, **color**等按鈕皆是**點一下筆刷、橡皮擦大或是字體大小、字形等相關設定就會出現**。**再按一下就會收合回去**，其中**fill**按鈕決定圖形為"fill"還是"stroke"的狀態，若是fill，button上的字體會顯示fill，**背景會填充的，反之中空**。
    * **鼠標圖片在此實作**。 
* **change_size.js**: **利用slider更改eraser, text及 pencil的大小、粗細值**，
    透過oninput function 回傳給Js, 供getContext用。
* **change_state.js**: 改變fill button狀態，將stroke改成fill，fill改成stroke。**決定圖形是fill 還是 stroke，包含實作"fill" button功能的函數**。
* **color.js**: 實作將color selector上選到的顏色透過滑鼠事件傳給getContext的函數。將**color selector中選到的顏色反應在color button上**。其中**backgroung**按鈕，設定來**快速新增背景顏色!**
* **download_upload.js**: 實作將canvas從url轉為img檔，下載下來，以及將圖片透過onchange事件以及file的input type上傳與貼到畫布上。其中圖片放置規則為由左至右，由上到下，當位置滿時，回到原點重疊上去。
* **reset.js**: Reset.js透過JQuerry的性質配合getContext的特性將畫布清空。
* **undo_redo.js**: 中**利用了lastStep function將getImageData與putImageData用來更新畫布**，最後用window.history實現undo跟redo的功能。

#### c s s 檔
* 利用css檔的table attribute，以及自訂的 id跟class ，float, inline 與 align等性質配合html排版。

## Github page link

   **https://heehee812.github.io/Web-Canvas/**
    
    
![](https://i.imgur.com/0BdzEjn.png)![](https://i.imgur.com/ETXcwON.png)![](https://i.imgur.com/JkOj20r.png)



<style>
table th{
    width: 100%;
}
</style>
