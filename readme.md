## About

Simple Django-React Project that proves how easily they can be integrated together for production

## Features


| *Dynamic Routing*


- `urls.py`

```
urlpatterns = [
    # -> Handled by Django
    path('admin/', admin.site.urls), #Django Admin
    path('apiconfig/',include('api.urls')), #Rest API

    # -> Handled by React Router
    path('',TemplateView.as_view(template_name="index.html")),
    re_path(r'^(?:.*)/?$',TemplateView.as_view(template_name="index.html"))

]
```

This is everything that Django has to handle the next will be done in React

First in the main APP routing configure a path like this

- `App.js`
```
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/repository/:user_id/:someOtherID" component={yourComponent} />
      </Switch>
    </Router>
  )
}

```

and then in  `yourComponent` fetch the `user_id` and the `:someOtherID` and send an `AJAX` to see if the requested row exists
and thats how you can implement dynamic routing with react and django

```
  history = useHistory() //from 'react-router-dom'
  ...

    useEffect(() => {
        const href = window.location.href; //Get the Current URL
        let isMatch = matchDetailRegExp(href,DetailRegExpRepository) //See if it matches the regex pattern of /repository/id_0/id_1
        if(!isMatch[0]) { //In case it does not match
            history.push('/404') //404 Page
            return () => {}
        }
        async function fetchData() {
            const response = await DetailRepository(isMatch[1],isMatch[0],token) //your AJAX function
            if(response.data.error) {
                history.push('/404')
             .... //Handle the request howerver you like
            }
            fetchData()
         }

        
```
---

| *Easily Send files using **Ajax***

Considering that you have am `<input type='file'>` and in your **AJAX**,                 `'Content-Type': 'multipart/form-data'` is a present header :

- First : Get the data when a file is uploaded 

```
<input onChange={() => handleFile()} id="file" type="file" ></input>
```

Now whenever a file is uploaded the function `handleFile` gets called

```
        let element = document.getElementById('file'); //Get the lement
        var formData = new FormData();
        let data = element.files[0] //The actual data

        formData.append("file",data)


```
And now the `AJAX` request can be send

```
        function sendData() {
            return axios.post('yourBackendApi.com',formData,{headers : {
                'Content-Type': 'multipart/form-data',
                Authorization : `Token ${token}`
            }})    
```
You can send it inside the `HandleFile`

```
    async function handleFile()  {
        let element = document.getElementById('file');
        var formData = new FormData();
        let data = element.files[0]

        formData.append("file",data)
        formData.append("id",id)

        function sendData() {
            return axios.post('http://localhost:8000/apiconfig/files/new/',formData,{headers : {
                'Content-Type': 'multipart/form-data',
            }})    
        }

        const response = await sendData();
         ..... //Do what you want with the response
    }


```

Now in Django `views.py`

Here I am extending the classes : `mixins.CreateModelMixin` and `viewsets.GenericViewSet` which should be used for creating rows but any requests can be handled like a normal `POST` request given that there is `serialier_class` and a `queryset` variable

```
from rest_framework import viewsets,mixins

class SendFile(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = YourSerializer
    queryset = yourTable.objects.all()


    def create(self,request,*args,**kwargs):
         INFO = request.data #or request.GET.get will work
         file = request.GET.get('file')


        if(file.size > 2500000): # You can use file.read() for files under 2.5MB
            return Response({"error" : "File cannot be greater than 2.5 MiB"})

        import os
        from django.conf import settings

        file_name = file.name

        #Where you want to write the file (in the /media/ folder)
        target = os.path.join(settings.BASE_DIR,'external_root','source-files','users',f'{user.pk}','repositories',f'{repo.name}')
        
        with open(os.path.join(target,file_name),'wb') as destination:
            for chunk in file.chunks(): #Works even if not in binary
                destination.write(chunk)
```

## Licence

`null`
