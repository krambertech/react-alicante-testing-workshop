export async function logIn({ password }) {
  return new Promise(
    (resolve, reject) =>
      setTimeout(() =>
        password === "password"
          ? resolve({ success: true })
          : reject({ success: false })
      ),
    400
  );
}
