### Чтобы запустить сервер напишите **npm run server** в консоль.
# To start the server write `npm run server` to the console.

### Чтобы увидеть базу данных напишите **npx prisma studio** в консоль.
# To see the data base write `npx prisma studio` to the console.

### документация.
# Documentation.

### **!!!Важно.**
1. All respons actually have a status of 200. Due to possible problems when processing other statuses.<br>
Все ответы на самом деле имеют статус 200. Из-за возможных проблем при обработке других статусов.

2. CORS policy is established only for localhost:3000. <br>CORS политика налажена лишь для localhost:3000.
***
### Example. Пример.

>**/...** --- First lvl of the pathName. Первый уровень пути к файлу.
>>**GET | POST | PUT | DELETE** --- HTTP request type. Тип HTTP запроса
>>
>>**Private | Public** --- Need authorizations. Нужда в авторизации.
>>
>>**/...** --- Second lvl of the pathName. Второй уровень пути к файлу.
>>>**Request Data** --- Data(Object) how sever expected get. Данные(Объект) которые сервер ожидает получить.
>>>
>>>**Response**: (Ответ сервера)
>>>
>>>__Status ***__ --- Status server response. Cтатус ответ сервера. | object --- Server response. Ответ сервера
>>*


****

## /profile
- ### **GET | Private | ' / '**  --- Give info about me; Выдает информацию обо мне;
- - **Request Data:** none;
- -
- - **Response:**
- - Status 401 | { message: 'not authorized' };
- - Status 500 | { message: 'Error sendind data', error };
- - Status 200 | { userData(me) };
- -
- ### **GET | Public | ' /:id '** --- Give info about person with specified :id; выдает ифнормацию о человеке с указанным :id;
- - **Request Data:** '/:userId';
- -
- - **Response:**
- -
- - Status 500 | { message: 'Failed to get the user', error };
- - Status 400 | { message: 'There is no such user' };
- - Status 200 | { userData(without password) };
- -
- ### **POST | Public | ' /login '** --- Log in; Залогиница;
- - **Request Data:** { email: *String*, password: *String* };
- -
- - **Response:**
- - Status 500 | { message: 'Login fail', error };
- - Status 400 | { message: 'Email or password uncorrect' };
- - Good response | saved token in cookie;
- -
- ### **POST | Public | ' /register '** --- Register; Зарегистрироваться;
- - **Request Data:** { name: *String*, email: *String*, password: *String* };
- -
- - **Response:**
- - Status 500 | { message: 'Server error', error };
- - Status 400 | { message: 'User was not created' };
- - Status 400 | { message: 'please fill in the required fields' };
- - Status 400 | { message: 'User with this email has already been created' };
- - Good response | saved token in cookie;
- -
- ### **POST | Private | ' /status '** --- Set status; Установить статус;
- - **Request Data:** { status: *String* }
- -
- - **Response:**
- - Status 401 | { message: 'not authorized' };
- - Status 500 | { message: 'Set status failed' , error };
- - Status 200 | { message: 'Status Update', status };
- -
- ### **POST | Private | ' /edit '** --- Set various data about yourself; Установить различные данные о себе;
- - **Request Data:** {age?: *Int*, status?: *String*, Sex?: *'man' | 'woman'*, vk?: *String*, github?: *String*};
- - **OR**
- - **Request Data:** new FormData().append('bg', photo).append('age', ...).append(...);
- -
- - **Response:**
- - Status 401 | { message: 'not authorized' };
- - Status 500 | { message: 'Set data failed', error };
- - Status 500 | { message: 'User folder not found', error };
- - Status 200 | { message: 'Set data successful', user(without posts) };
- -
- ### **DELETE | Private | ' /delete '** --- Delete you account; Удалить свой аккаунт;
- - **Request Data:** none;
- -
- - **Response:**
- - Status 401 | { message: 'not authorized' };
- - Status 500 | { message: 'Delete error', error };
- - Status 200 | { message: 'User was deleted' };
- -
- ### **PUT | Private | ' /photo '** --- Save profile photo; Сохраняет фото профиля;
- - **Request Data:** new FormData().append('profilePhoto', photo), headers: {'Content-Type': 'multipart/form-data';}
- -
- - **Response:**
- - Status 500 | { message: 'Fail save photo', error };
- - Status 500 | { message: 'User folder not found', error };
- - Status 400 | { message: 'File is incorrect' };
- - Status 201 | { message: 'Photo update successful', user: newIm };
- -
- ### **PUT | Private | ' /bgPhoto '** --- Save profile bg; Сохраняет фото профиля;
- - **Request Data:** new FormData().append('bg', photo), headers: {'Content-Type': 'multipart/form-data';}
- -
- - **Response:**
- - Status 500 | { message: 'Fail save photo', error };
- - Status 500 | { message: 'User folder not found', error };
- - Status 400 | { message: 'File is incorrect' };
- - Status 201 | { message: 'Bg update successful', user: newIm };
- -
***
## /users
- ### **GET | Public | ' / '** --- Give all users; Выдает все пользователей;
- - **Request Data:** none;
- -
- - **Response:**
- - Status 500 | { message: 'Server error', error };
- - Status 200 | { user(without password, bgPhoto, email) };
****
## /post
- ### **GET | Public | ' / '** --- Give all posts; Выдает все посты;
- - **Request Data:** none;
- -
- - **Response:**
- - Status 500 | { message:'Failed to get posts', error };
- - Status 200 |
    <br>{
    <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; message: 'Getting posts successfully',
    <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; posts: {
    <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; title?: *String*,
    <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; text: *String*,
    <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; id: *String*,
    <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; author: {userId: *String*, photo?: *String*, name: *String*, status?: *String*}
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
    <br>};
- -
- ### **GET | Public | ' /:id '** --- Give all user posts; Выдает все посты пользователя;
- - **Request Data:** /:userId;
- -
- - **Response:**
- - Status 500 | { message:'Failed to get posts', error };
- - Status 200 | { message: 'Getting posts successfully', posts };
- -
- ### **POST | Private | ' /create '** --- Creates post; Создает пост;
- - **Request Data:** {title?: *String*, text: *String*};
- -
- - **Response:**
- - Status 500 | { message: 'Failed to create posts', error };
- - Status 400 | { message: 'Unable to create a post without text' };
- - Status 201 | { message: 'Post was seccessfully created', post };
- -
- ### **PUT | Private | ' /edit '** --- Edits post; Изменяет пост;
- - **Request Data:** { data: {title?: *String*, text: *String*}, id: *String* };
- -
- - **Response:**
- - Status 500 | { message: 'Failed to edit post', error };
- - Status 400 | { message: 'No data' };
- - Status 400 | { message: 'Either post id uncorrect or user is not the owner' };
- - Status 200 | { message: 'Post edited' };
- -
- ### **DELETE | Private | ' /delete '** --- Deletes post; Удаляет пост;
- - **Request Data:** { id: *String* };
- -
- - **Response:**
- - Status 500 | { message: 'Failed to delete post', error };
- - Status 400 | { message: 'No postId' };
- - Status 400 | { message: 'Either post id incorrect or user is not the owner' };
- - Status 204 | { message: 'Post deleted'};
- -
****

## /message
- ### **GET | Private | ' /:userId '** --- Give correspondence with one user; Выдает переписку с одним пользователем;
- - **Request Data:** /:userId;
- -
- - **Response:**
- - Status 500 | { message: 'Failed get message', error };
- - Status 400 | { message: 'No user ID' }
- - Status 200 | { message: 'Messages received', messages } ;
- -
### **GET | Private | ' /interlocutors '** --- Give interlocutors; Выдает собеседников;
- - **Request Data:** none;
- -
- - **Response:**
- - Status 500 | { message: 'Failed get interlocutors', error };
- - Status 200 | { message: 'Interlocutors get seccussefuly', interlocutors } ;
- -
- ### **POST | Private | ' /send/:userid '** --- Sends message(creates); Отправляет сообщение(создает);
- - **Request Data:** {text: *String*}, /:userId;
- -
- - **Response:**
- - Status 500 | { message: 'Failed send message', error };
- - Status 400 | { message: 'No user ID' }
- - Status 201 | { message: 'Message seccessfully sended', sendedMessage };
- -
- ### **PUT | Private | ' /edit/:messageId '** --- Edits message; Изменяет сообщение;
- - **Request Data:** {text: *String*}, /:messageId;
- -
- - **Response:**
- - Status 500 | { message: 'Failed edit message', error };
- - Status 400 | { message: 'No message ID or text' }
- - Status 400 | { message: 'Either message id incorrect or you is not the owner' };
- - Status 200 | { message: 'Message edited' };
- -
- ### **DELETE | Private | ' /:messageId '** --- Deletes message; Удаляет сообщение;
- - **Request Data:** /:messageId;
- -
- - **Response:**
- - Status 500 | { message: 'Failed delete message', error };
- - Status 400 | { message: 'No message ID' }
- - Status 400 | { message: 'Either message id incorrect or you is not the owner' };
- - Status 200 | { message: 'Deleted seccessfully' };
- -
****