const getButton = document.getElementById("get-button");
const apiTextInput = document.getElementById("api-text-input");

const idDiv = document.getElementById("id-div");
const nameDiv = document.getElementById("name-div");
const probabilityDiv = document.getElementById("probability-div");
const imagePathDiv = document.getElementById("image-path-div");
var imageNode = document.getElementById("image-img");

const onClickGetButton = async () => {
  getButton.classList.add("is-loading");
  getButton.classList.remove("is-danger");
  try {
    const res = await fetch(apiTextInput.value);
    const resJson = await res.json();

    idDiv.innerText = `${resJson.id}`;
    nameDiv.innerText = `${resJson.name}`;
    probabilityDiv.innerText = `${resJson.probability * 100}%`;
    imagePathDiv.innerText = `${resJson.image.path}`;
    imageNode.src = resJson.image.data_uri;

    document.getElementById("result-section").style.removeProperty("display");
    getButton.innerText = "GET";
    getButton.classList.remove("is-loading");
  } catch (error) {
    console.error(error);
    getButton.classList.remove("is-loading");
    getButton.classList.add("is-danger");
    getButton.innerText = "ERROR";
  }
};

apiTextInput.value =
  "http://object-result-api-spai.apps.spai.ml/_api/object/latest";
getButton.addEventListener("click", onClickGetButton);
apiTextInput.addEventListener("keyup", (event) => {
  event.key === "Enter" && onClickGetButton();
});
