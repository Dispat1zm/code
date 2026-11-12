import { ApplicationRepository } from "./application.repository";

const application = new ApplicationRepository();

console.log('=============================================================');

application.users.save(application.users.create("Nikita"));
application.users.save(application.users.create("Ivan"));

console.log(application.users.findAll());

console.log("---------------------");

console.log(application.users.existsById(1));

console.log("---------------------");

application.users.deleteById(1);

console.log(application.users.findAll());

console.log('=============================================================');

application.books.save(application.books.create("Nikita123", 1));
application.books.save(application.books.create("Ivan123", 2));

console.log(application.books.findAll());

console.log("---------------------");

console.log(application.books.existsById(1));

console.log("---------------------");

application.books.deleteById(1);

console.log(application.books.findAll());

console.log("---------------------");

application.books.deleteAllByAuthorId(2);

console.log(application.books.findAll());

console.log('=============================================================');

application.users.save(application.users.create("Nikita"));
application.books.save(application.books.create("Nikita123", 1));

application.reviews.save(application.reviews.create(1, 2, "111111"));
application.reviews.save(application.reviews.create(2, 1, "111111"));

console.log(application.reviews.findAll());

console.log("---------------------");

console.log(application.reviews.existsById(1));

console.log("---------------------");

application.reviews.deleteById(1);

console.log(application.reviews.findAll());