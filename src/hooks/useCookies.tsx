import Cookies, { CookieSetOptions } from "universal-cookie"

const UseCookies = () => {
  const cookies = new Cookies(null, { path: '/' })

  function getCookie(name: string): string {
    return cookies.get(name)
  }

  function setCookie(name: string, value: string, options?: CookieSetOptions): void {
    void cookies.set(name, value, options)
  }

  function destroy(name: string): void {
    void cookies.remove(name)
  }

  return {
    getCookie,
    setCookie,
    destroy
  }
}

export default UseCookies
