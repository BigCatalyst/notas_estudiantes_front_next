export const URL_PAGE_LOGIN = '/login'; // Define la URL de la página de login

export function getUrlLogin(msg: string | null = null): string {
  // Si hay un mensaje, codifícalo y añádelo como query parameter
  if (msg) {
    const encodedMsg = encodeURIComponent(msg); // Codifica el mensaje
    return `${URL_PAGE_LOGIN}?message=${encodedMsg}`;
  }

  // Si no hay mensaje, devuelve solo la URL de login
  return URL_PAGE_LOGIN;
}

export function routePushLogin(router,msg=null){
    if(msg){
        router.push({
            pathname: getUrlLogin(),
            query: { message: msg },
          });
    }else{
        router.push(getUrlLogin())
    }
}