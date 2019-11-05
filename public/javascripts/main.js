console.log("Alive!");


document.querySelector("#reg_btn").addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Click");
        // получаем данные формы
        let firstName = document.querySelector('#reg_name').value;
        let lastName = document.querySelector('#reg_lastname').value;
        let email = document.querySelector('#reg_email').value;
        let password = document.querySelector('#reg_pwd').value;
        let dob = document.querySelector('#reg_dob').value;
        let phone = document.querySelector('#reg_phone').value;
        // let direction = JSON.stringify({way});
        let formRegister= {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            dob:dob,
            phone:phone
        };
        console.log(formRegister);

        fetch('/users/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formRegister),
        })
            .then((response)=> {
                if (response.status === 200) {
                    console.log("response");
                    return  response.json()
                }
            })
            .then(result=>{
                // localStorage.setItem('result', result);
                console.log(result)
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });

    }
);