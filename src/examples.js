import WordChecker from "./02-testing-react/lecture/WordChecker";
import Counter from "./02-testing-react/01-task-counter/Counter";
import Welcome from "./02-testing-react/02-task-welcome/Welcome";
import Login from "./03-async-react/lecture/Login";
import Quote from "./03-async-react/01-task-quotes/Quote";

export default [
  { name: "Word checker", component: WordChecker, route: "word-checker" },
  { name: "Counter", component: Counter, route: "counter" },
  { name: "Welcome", component: Welcome, route: "welcome" },
  { name: "Login", component: Login, route: "login" },
  { name: "Quote generator", component: Quote, route: "quote" },
];
