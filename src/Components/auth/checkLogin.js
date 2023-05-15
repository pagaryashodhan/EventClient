export function checkLogedIn() {
  const savedData = localStorage.getItem("token");
  // console.log("Data Is Saved")
  // console.log(savedData);
  if (savedData != null) return true;
  else return false;
}

export default checkLogedIn;
