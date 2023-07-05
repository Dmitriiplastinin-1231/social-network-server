### Чтобы запустить сервер напишите **npm run server** в консоль.
# To start the server write `npm run server` to the console.

### Чтобы увидеть базу данных напишите **npx prisma studio** в консоль.
# To see the data base write `npx prisma studio` to the console.

### документация.
# Documentation.

### **!!!Важно.**
1. All respons actually have a status of 200. Due to the browser(or axios, i don't know) processing other statuses as errors.<br>
Все ответы на самом деле имеют статус 200. Из-за обрабатывания браузером(или аксиусом, я не знаю) других статусов, как ошибки.

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

## /Profile
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
- -
- - **Response:**
- - Status 401 | { message: 'not authorized' };
- - Status 500 | { message: 'Set data failed', error };
- - Status 200 | { message: 'Set data successful', user };
- -
- ### **DELETE | Private | ' /delete '** --- Delete you account; Удалить свой аккаунт;
- - **Request Data:** none;
- -
- - **Response:**
- - Status 401 | { message: 'not authorized' };
- - Status 500 | { message: 'Delete error', error };
- - Status 200 | { message: 'User was deleted' };
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
