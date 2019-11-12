console.log("Alive!");


document.querySelector("#post_btn").addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Click");
        let ls = localStorage.getItem('auth-token');

    // получаем данные формы
        let title = document.querySelector('#post_title').value;
        let body = document.querySelector('#post_body').value;
        //
        let post= {
            title,
            body,
        };

        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': ls
            },
            body: JSON.stringify(post)  ,
        })
            .then((response)=> {
                if (response.status === 200) {
                    console.log("response MAIN3");
                    return  response.json()
                }
            })
            .then(result=>{
                console.log(result)
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });

    }
);