export default function Yell({ generateYellMessage, onBeenYelled }) {
  const handleYell = () => {
    const message = generateYellMessage?.() || "HEY!";

    alert(message);
    onBeenYelled?.(message);
  };

  return <button onClick={handleYell}>🙀 Please, yell at me!</button>;
}
