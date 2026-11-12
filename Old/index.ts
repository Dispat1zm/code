// var title: string = "Sergei";
// var age: number = 60;
// var isStudent: boolean = true;

// var friends: (number | string | boolean)[] = [1, "Divan", true, false];
// var correntFriends: string[] = ["Ivan", "Divan", "Roshan"];

// var studentEgor: {
//     name: string;
//     firstName: string;
//     age: number;
//     isStudent: boolean
// } = {
//     name: "Ivan",
//     firstName: "Fanat",
//     age: 10,
//     isStudent: true
// };

// var subjects = [
//     {
//         name: "Технология разработки программного обеспечения",
//         short: "ТРПО",
//         teacher: {
//             firstName: "Ситник",
//             secondName: "Никита",
//             fatherName: "Андреевич"
//         }
//     },
//     {
//         name: "Инструментальные средства разработки программного обеспечения",
//         short: "Инструментальные средства",
//         teacher: {
//             firstName: "Хоцина",
//             secondName: "Людмила",
//             fatherName: "Валерьевна"
//         }
//     },
//     {
//         name: "Стандартизация, сертификация и техническое документоведение",
//         short: "Стандартизация",
//         teacher: {
//             firstName: "Сысолин",
//             secondName: "Анатолий",
//             fatherName: "Юрьевич"
//         }
//     }
// ];

// console.log(title, age, isStudent);
// console.log(friends[1]);
// console.log(correntFriends);
// console.log(studentEgor);

// console.log(subjects);

// const users: string[] = ["Nikita", "Artem", "Ivan"];

// function helloV1(): void {
//     console.log(1);
//     console.log ("user");
// }

// function helloV2(title: string, age: number): void {
//     console.log(`name: ${title}, age: ${age}`);
// }

// function helloV3(a: number, b: number): number {
//     return a + b;
// }

// function helloV4(a: number, b: number): number {
//     return a -b;
// }

// function helloV5(a: number, b: number): number {
//     return a * b;
// }

// function helloV6(a: number, b: number): number {
//     return a / b;
// }

// const helloV1Anon = (a: number, b: number) => a + b; 

// helloV2("xz", 20);
// console.log(`result:\n${helloV3(5,7)}`);
// console.log(`${helloV4(5,7)}`);
// console.log(`${helloV5(5,7)}`);
// console.log(`${helloV6(5,7)}`);

// console.log(helloV1Anon(1, 1));

// const a1 = 1;
// const a2 = 1;
// const aResult = a1 == a2;

// console.log(`aResult: ${aResult}`);

// var b1 = 1;
// var b2 = 2;
// var bResult = b1 == b2;

// console.log(`aResult: ${bResult}`);

// var c1 = 1;
// var c2 = "1";

// const cResultV1 = c1 == c2;
// console.log(`cResulrV1: ${cResultV1}`);

// const cResultV2 = c1 === c2;
// console.log(`cResulrV1: ${cResultV2}`);

// const dResultV1 = 0 == 1 || 2 == 2;
// const dResultV2 = 0 == 1 && 2 == 2;

// const welcomeUser = (user: string, welcomeFunction: (value: string) => void): void => {
//     console.log(`debug: we got user - ${user}`);

//     welcomeFunction(user);
// };

// welcomeUser("Jhon", (value: string): void => console.log(`ABC: ${value}`));

// const updateUsers = users.filter((value:string)=> value.length <= 4);

// console.log(updateUsers);

// const demoFunction = (
//     plus: (a: number, b: number ) => number,
//     minus: (a : number , b: number) => number,
//     divide: (a: number, b: number ) => number,
//     multiply: (a: number, b: number ) => number
// ): number => {
//     const a = 10;
//     const b = 52;

//     return plus(a, b) + minus(a, b) + divide(a, b) + multiply(a, b);
// }

// const result = demoFunction(
//     (a, b) => (a + b),
//     (a, b) => (a - b),
//     (a, b) => (a / b),
//     (a, b) => (a * b)
// )

// console.log(result);

// const users = ["Maksim", "Ivan", "Anton", "Efim", "GLEBASIK"];

// const resultUsers = users
//     .filter((value: string) => value.length > 4)
//     .map((value: string) => value.toUpperCase())
//     .map((value, index) => ({
//         id: index,
//         value,
//         tasks: value.split("").map((item, index) => `# ${index + 1} -- ${item}`)
//     }))
//     .filter((value, index) => index %2 == 0)
//     .forEach(item => console.log(item))

// type RoleType = "teacher" | "student";
// type User = {
//     id: number;
//     title: string;
//     role: RoleType
// };
// type Subject = {
//    id: number;
//    title: string;
// };
// type College = {
//     id: number;
//     title: string;
//     teachers: User[];
//     students: User[];
//     subjects: Subject[]
// };

// const users: User[] = [
//     {
//         id: 1,
//         title: "Ivan",
//         role: "student"
//     },
//     {
//         id: 2,
//         title: "Egor",
//         role: "student"
//     },
//     {
//         id: 3,
//         title: "GLEBASIK",
//         role: "student"
//     },
//     {
//         id: 4,
//         title: "Andeushkevich",
//         role: "teacher"
//     },
//     {
//         id: 5,
//         title: "Dmitrevich",
//         role: "teacher"
//     }
// ];

// const college1: College = { 
//     id: 1,
//     title: "НКЭиВТ",
//     teachers: users.filter((user) => user.role === "teacher"), 
//     students: users.filter((user) => user.role === "student"), 
//     subjects: [{
//         id: 1,
//         title: ""
//     }]
// };

// console.log(college1);

// class CollegeLib {
//     id: number;
//     title: string;

//     students: User[];
//     teachers: User[];
//     subjects: Subject[];

//     constructor(id:number, title:string ) {
//         this.id = id;
//         this.title = title;

//         this.students= [];
//         this.teachers= [];
//         this.subjects= [];
//     }

//     findUserById(id: number): User | undefined {
//         if(this.students.find((user) => user.id === id)) return this.students.find((user) => user.id === id);
//         else return this.teachers.find((user) => user.id === id);
//     }

//     addUser(user: User): void {
//         if(user.role === "student") {
//             this.students.push({
//                 id: user.id,
//                 title: user.title,
//                 role: user.role
//             });
//         } else {
//             this.teachers.push({
//                 id: user.id,
//                 title: user.title,
//                 role: user.role
//             });
//         }
//     }

//     removeUserId(id: number): void {
//         this.students.map((user) => {
//             if(user.id === id)
//             this.students.splice(this.students.indexOf(user), 1);
//         });

//         this.teachers.map((user) => {
//             if(user.id === id)
//             this.teachers.splice(this.teachers.indexOf(user), 1);
//         });
//     }

//     clearUsers() {
//         this.students.map((user) => this.students.splice(this.students.indexOf(user)));
//         this.teachers.map((user) => this.teachers.splice(this.teachers.indexOf(user)));
//     }

//     getAllUser() {
//         console.log(this.students);
//         console.log(this.teachers);
//     }
// }

// console.log("============================================================");

// const lib = new CollegeLib(1, "НКЭиВТ");

// lib.addUser({id:8, title:"Kirill", role:"student"});
// lib.addUser({id:2, title:"Kirill12", role:"student"});
// lib.addUser({id:1, title:"Kirill23", role:"teacher"});
// lib.addUser({id:9, title:"Kirill34", role:"teacher"});
// lib.addUser(users[4]);
// lib.getAllUser();

// console.log("------------");

// console.log(lib.findUserById(2));

// console.log("------------");

// lib.removeUserId(1);
// lib.getAllUser();

// console.log("------------");

// lib.clearUsers();
// lib.getAllUser();

console.log('=============================================================');

class DocumentItem {
    public id: number;
    public title: string;
    public content: string;
    public author: string;
    public releaseDate: Date;

    constructor(id: number, title: string, content: string, autor: string, releaseDate: Date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = autor;
        this.releaseDate = releaseDate;
    }

    print() {
        console.table([this]);
    }
}

const documentItem1 = new DocumentItem(1, "Doc1", "Важная информация", "Иванов Г.", new Date(),);
const documentItem2 = new DocumentItem(2, "Doc2", "Важная информация", "Владимер В.", new Date(),);
const documentItem3 = new DocumentItem(3, "Doc3", "Важная информация", "Артём А.", new Date(),);

class DocumentRepository {
    public readonly documents: DocumentItem[];

    constructor() {
        this.documents = [];
    }

    save(document: DocumentItem) {
        this.documents.push(document);
    };

    printAll() {
        this.documents.forEach((docum) => {
            docum.print()
        });
    }

    findById(id: number): DocumentItem | undefined {
        return this.documents.find((docum) => docum.id === id);
    }

    findByAuthor(author: string): DocumentItem[] | undefined {
        return this.documents.filter((docum) => docum.author === author);
    }

    deleteById(id: number) {
        this.documents.forEach((docum) => {
            if(docum.id === id)
            this.documents.splice(this.documents.indexOf(docum), 1);
        });
    }

    update(id: number, document: DocumentItem) {
        this.documents.forEach((docum) => {
            if(docum.id === id)
            this.documents[this.documents.indexOf(docum)].id = document.id;
            this.documents[this.documents.indexOf(docum)].title = document.title;
            this.documents[this.documents.indexOf(docum)].content = document.content;
            this.documents[this.documents.indexOf(docum)].author = document.author;
            this.documents[this.documents.indexOf(docum)].releaseDate = document.releaseDate;
        });
    }

    clear() {
        this.documents.forEach((docum) => this.documents.length = 0);
    }
}

const documRepo = new DocumentRepository();
documRepo.save(documentItem1);
documRepo.save(documentItem2);
documRepo.save(documentItem3);

class Application {
    public readonly documents: DocumentRepository;

    constructor(DocumentRepository: DocumentRepository){
        this.documents = DocumentRepository;
    }
}

const application = new Application(documRepo);

application.documents.printAll();

console.log("-findById(1)-");

console.log(application.documents.findById(1));

console.log("findByAuthor(Владимер В.)-");

console.log(application.documents.findByAuthor("Владимер В."));

console.log("-deleteById(3)-");

application.documents.deleteById(3);

application.documents.printAll();

console.log("-update(1, documentItem3)-");

application.documents.update(1, documentItem3);

application.documents.printAll();

console.log("-clear()-");

application.documents.clear();

application.documents.printAll();

console.log("-application.documents.printAll();-");

application.documents.printAll();