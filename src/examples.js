import WordChecker from "./02-testing-react/example-01-word-checker/WordChecker";
import Counter from "./02-testing-react/task-01-counter/Counter";
import Welcome from "./02-testing-react/task-02-welcome/Welcome";
import Login from "./03-async-react/example-01-login/Login";
import Quote from "./03-async-react/task-01-quotes/Quote";

export default [
  { name: "Word checker", component: WordChecker, route: "word-checker" },
  { name: "Counter", component: Counter, route: "counter" },
  { name: "Welcome", component: Welcome, route: "welcome" },
  { name: "Login", component: Login, route: "login" },
  { name: "Quote generator", component: Quote, route: "quote" },
];
