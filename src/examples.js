import WordChecker from "./1-testing-react-components/1-word-checker/WordChecker";
import Counter from "./1-testing-react-components/2-task-counter/Counter";
import Login from "./1-testing-react-components/3-login/Login";
import QuoteGenerator from "./1-testing-react-components/4-task-quotes/QuoteGenerator";
import MusingsApp from "./2-testing-application/index";

const examples = [
  {
    name: "💁‍♀️ Word checker",
    component: WordChecker,
    route: "word-checker",
  },
  { name: "🧑‍💻 Counter", component: Counter, route: "counter" },
  { name: "💁‍♀️ Login", component: Login, route: "login" },
  {
    name: "🧑‍💻 Quote generator",
    component: QuoteGenerator,
    route: "quote-generator",
  },
  { name: "🧠 Musings", component: MusingsApp, route: "app" },
];

export default examples;
