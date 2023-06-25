## Чтобы запустить сервер напишите **npm run server** в консоль
# To start the server write `npm run server` to the console.

## Чтобы увидеть базу данных напишите **npx prisma studio** в консоль.
# To see the data base write `npx prisma studio` to the console.

## документация.
# Documentation.

## Example. Пример.

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

***
****

>## /Profile
>>### **GET | Private | ' / '**  --- Give info about me; Выдает информацию обо мне;
>>>**Request Data:** none;
>>>
>>>**Response:**
>>>
>>>Status 401 | { message: 'not authorized' };
>>>
>>>Status 500 | { message: 'Error sendind data', error };
>>>
>>>Status 200 | { userData(me) };
>>### **GET | Public | ' /:id '** --- Give info about person with specified :id; выдает ифнормацию о человеке с указанным :id;
>>>**Request Data:** none;
>>>
>>>**Response:**
>>>
>>>Status 500 | { message: 'Failed to get the user', error };
>>>
>>>Status 400 | { message: 'There is no such user' };
>>>
>>>Status 200 | { userData(without password) };
>>### **POST | Public | ' /login '** --- Log in; Залогиница;
>>>**Request Data:** { email: *String*, password: *String* };
>>>
>>>**Response:**
>>>
>>>Status 500 | { message: 'Login fail', error };
>>>
>>>Status 400 | { message: 'Email or password uncorrect' };
>>>
>>>Good response | saved token in cookie;
>>### **POST | Public | ' /register '** --- Register; Зарегистрироваться;
>>>**Request Data:** { name: *String*, email: *String*, password: *String* };
>>>
>>>**Response:**
>>>
>>>Status 500 | { message: 'Server error', error };
>>>
>>>Status 400 | { message: 'User was not created' };
>>>
>>>Status 400 | { message: 'please fill in the required fields' };
>>>
>>>Status 400 | { message: 'User with this email has already been created' };
>>>
>>>Good response | saved token in cookie;
>>### **POST | Private | ' /status '** --- Set status; Установить статус;
>>>**Request Data:** { status: *String* }
>>>
>>>**Response:**
>>>
>>>Status 401 | { message: 'not authorized' };
>>>
>>>Status 500 | { message: 'Set status failed' , error };
>>>
>>>Status 200 | { message: 'Status Update', status };
>>### **POST | Private | ' /edit '** --- Set various data about yourself; Установить различные данные о себе;
>>>**Request Data:** {age?: *Int*, status?: *String*, Sex?: *'man' | 'woman'*, vk?: *String*, github?: *String*};
>>>
>>>**Response:**
>>>
>>>Status 401 | { message: 'not authorized' };
>>>
>>>Status 500 | { message: 'Set data failed', error };
>>>
>>>Status 200 | { message: 'Set data successful', user };
>>### **DELETE | Private | ' /delete '** --- Delete you account; Удалить свой аккаунт;
>>>**Request Data:** none;
>>>
>>>**Response:**
>>>
>>>Status 401 | { message: 'not authorized' };
>>>
>>>Status 500 | { message: 'Delete error', error };
>>>
>>>Status 200 | { message: 'User was deleted' };
>>
>>****
***
>## /users
>>### **GET| Public | ' / '** --- Give all users; Выдает все пользователей;
>>>**Request Data:** none;
>>>
>>>**Response:**
>>>
>>>Status 500 | { message: 'Server error', error };
>>>
>>>Status 200 | { user(without password, bgPhoto, email) };
>> ****