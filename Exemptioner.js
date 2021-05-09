class Exemptioner extends Person {
	
	constructor (firstName, lastName, hPrice){
		super(firstName, lastName, price);
		this.hPrice=0.5;
	}
	get value(){return this.hPrice}
	set value(sum){this.price=sum}

	message (){
		return confirm('Бажаєте в майбутньому отримувати інформацію про акції і знижки на подорожі?')
	}
}