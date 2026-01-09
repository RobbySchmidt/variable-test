export default defineNuxtRouteMiddleware((to, from) => {
  const successFlag = useCookie('formSuccess')

  if (!successFlag.value) {
    return navigateTo('/')
  }

  successFlag.value = null
})
