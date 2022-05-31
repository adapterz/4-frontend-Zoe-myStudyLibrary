async function signUpGuide() {
  const terms = await getSignUpGuide();

  document.getElementsByClassName("container__terms--content")[0].innerHTML = terms;
}
signUpGuide();