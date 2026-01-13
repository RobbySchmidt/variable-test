export default defineEventHandler(async (event) => {
    const urlObj = getRequestURL(event)
    let url = urlObj.pathname

    const runtimeConfig = useRuntimeConfig()

    //Check for VS index.php?s=19 stuff
    if(urlObj.search != ''){
        //if search string is set, add it to url 
        url = url + urlObj.search
    }
    // console.log(url)

    // don't touch error routes
    if (urlObj.pathname === '/__nuxt_error') return

    //get Redirectus from Directus
    const redirects = await $fetch(runtimeConfig.public.directusUrl+"/items/redirects")


    //find redirects
    const redirect = redirects.data.find(r => r.url_old === url)

    // if redirect is there, send redirect header
    if(redirect && redirect.response_code === '410'){
        setResponseStatus(event, 410, "Page not longer available")
        throw createError({ statusCode: 410, statusMessage: 'Page not longer available' })
    }else if (redirect){
        await sendRedirect(event, redirect.url_new, redirect.response_code)
    } else {

    }
    
})