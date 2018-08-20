var app = new Vue({
    el:'#app',
    data:{
        User:{
            username:'',
            password:''
        },
        Item:{
            name:'',
            price:0,
            stock:0,
            tags:'',
        }
    },
    methods:{
        register: function(){
            axios.post('http://localhost:3000/register',{
                username: this.User.username,
                password: this.User.password,
            })
            .then(function(newUser){
                alert('Register Success')
                window.location.replace('index.html')
            })
        },
        login:function(){
            axios.post('http://localhost:3000/login',{
                username:this.User.username,
                password:this.User.password
            })
            .then(function(user){
                alert('Login Success')
                localStorage.setItem('token',user.data.token)
                window.location.replace('index.html')
            })
            .catch(function(err){
                alert('Login Failed')
                window.location.replace('index.html')
                console.log(err);
            })
        },
        logout:function(){
            localStorage.removeItem('token')
            window.location.replace('index.html')
        },
        addItem:function(){
            axios.post('http://localhost:3000/items',{
                name:this.Item.name,
                price:this.Item.price,
                stock:this.Item.stock,
                tags:this.Item.tags
            },{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            .then(function(newItem){
                alert('Add item success')
                window.location.reload()
                console.log(newItem);
            })
            .catch(function(err){
                alert('Add item failed')
                window.location.reload()
                console.log(err);
            })
        }

    }
})