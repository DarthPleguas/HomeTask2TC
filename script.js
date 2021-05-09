		let user = new Exemptioner(firstName, lastName,hPrice);
		let cart = {
			'travel':1,
			'tea': 0
		};

		var exemId=document.getElementById('age').value;
		var price = 220;
		var hPrice =user.value;
		user.value=0.5;
		
		function serverSubmit(){
			let firstName=document.getElementById('firstName').value;
			let lastName=document.getElementById('lastName').value;
			if (firstName==0 || lastName==0){
				alert('Заповніть поля');
				return false;
			}
			user.firstName=firstName;
			user.lastName=lastName;
			const p = new Promise (function(resolve, reject){
				setTimeout(()=>{
					const backendData = {
						server: 'aws',
						status: 'working',
						data: user
					}
					resolve(backendData);
				},500)
			});

			p.catch(err =>console.error('Error: ', err))

			p.then(data=>{                                            //LexicalEnvironment : const p = new Promise
				const p2 = new Promise (function(resolve, reject){
					
				setTimeout(()=>{
					data.modifited=true;
					let el = document.getElementById('form1');
					el.style.display = 'none';
					let f2 = document.getElementById('secF');
					f2.style.display = 'block';
					let hello=document.getElementById('greeting');
					hello.innerHTML+=`Привіт, <b>${firstName} ${lastName}!</b>`
					if(document.getElementById('age').value==0)
					 	{
					 		document.getElementById('bonus').innerHTML=`Вартість 1 квитка: ${price} грн`;	
					 	}
					else{
					 	document.getElementById('bonus').innerHTML=`Вартість 1 квитка з врахуванням пільги: ${price*hPrice} грн`;
					}

					resolve(data)
				}, 1000)
			})
		}
		)};
		document.onclick = event => {
			if(event.target.classList.contains('plus')){
				plusFunction(event.target.dataset.id);
			}
			if(event.target.classList.contains('minus')){
				minusFunction(event.target.dataset.id);
			}
		}
		const plusFunction = id =>{
			cart[id]++;
			renderCart();
		}
		const minusFunction = id =>{
			if(cart[id]==0){
				return false;
			}
			cart[id]--;
			renderCart();
		}
		const renderCart =()=>{
			document.getElementById("cupsOfTea").innerHTML= " " + cart.tea;
		}
		renderCart();
		function result() {
			 document.getElementById("res").innerHTML= " ";
			 if(document.getElementById('age').value==0)
			 	{
			 		var sum = cart.travel*price + cart.tea*10;
			 	}
			else{
				var sum = cart.travel*price*hPrice + cart.tea*10;}
			var text = document.getElementById("res");
			text.innerHTML+= `Загальна вартість подорожі: <b>${sum} грн.</b>`;	
		}

		function outCome(){
			const p3 = new Promise (function(resolve){
				setTimeout(()=>{
					let f2 = document.getElementById('secF');
					f2.style.display = 'none';
					let hello=document.getElementById('greeting');
					hello.style.display = 'none';
					if(document.getElementById('age').value==0){
				 		var sum = cart.travel*price + cart.tea*10;
				 		delete user.hPrice;
				 		if(user.message()){
				 			user.price=sum;
				 			console.log (user);
				 		}
				 	}
				 	else{var sum = cart.travel*price*hPrice + cart.tea*10;
				 		user.hPrice=sum;
				 		delete user.price;
				 	}
					document.getElementById('title').innerHTML= `<h1>Квиток</h1>`
					document.getElementById('outcome').innerHTML+= `Ім'я та прізвище: ${user.firstName} ${user.lastName}</br> Відправлення: A</br> Прибуття: B </br> Загальна вартість: ${sum} грн`
					user.value=sum;
					const clientData={
						status: 'working',
						data: user
					}
					resolve(clientData)
				}, 500)
			})
			p3.then((clientData)=>{ // Lexical Environment: setTimeout 
				p3.catch(err =>console.error('Error: ', err))
			})
		}