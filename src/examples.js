import WordChecker from "./02-testing-react/example-01-word-checker/WordChecker";
import Counter from "./02-testing-react/task-01-counter/Counter";
import Welcome from "./02-testing-react/task-03-welcome/Welcome";
import Login from "./02-testing-react/example-02-login/Login";
import Quote from "./02-testing-react/task-02-quotes/Quote";
import Yell from "./02-testing-react/example-02-login/Yell";

const examples = [
  { name: "Word checker", component: WordChecker, route: "word-checker" },
  { name: "Counter", component: Counter, route: "counter" },
  { name: "Welcome", component: Welcome, route: "welcome" },
  { name: "Login", component: Login, route: "login" },
  { name: "Yelling", component: Yell, route: "yell" },
  { name: "Quote generator", component: Quote, route: "quote" },
];

export default examples;
