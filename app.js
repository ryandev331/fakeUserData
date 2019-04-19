new Vue({
    el: '#app',
    data: {
        userData: {},
        detailItem: [],
        userDetail: [],
        showIdx: '',
        mailLink: [],
        isActive: false,
        styleList: {
            color: ''
        }
    },
    methods: {
        getData() {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(res => {
                    return res.json()
                }).then(data => {
                    this.showIdx = ''
                    this.userDetail = []
                    this.detailItem: [],
                    this.isActive = false
                    this.userData = data.reverse()
                    this.showColor()
                }).catch(error => {
                    console.log(error)
                })
        },
        change() {
            //nme to lower case
            // let mailLink = document.querySelectorAll('tbody tr a')
            let mailArr = [];
            this.userData.forEach(function(item, idx, arr) {
                item.username = item.username.toLowerCase()
                mailArr.push(item.email)
                    // mailLink[idx].getAttributeNode('href').value = `mailto:${item.email}`
            })
            this.mailLink = mailArr
            this.isActive = true


        },
        showColor() {
            let tr = document.querySelector('tbody').children
            for (n = 0; n < tr.length; n++) {
                if (n !== this.showIdx) {
                    tr[n].classList.remove('active')
                } else {
                    tr[n].classList.add('active')
                }
            }
        },
        showDetail(idx) {
            this.showIdx = idx
            this.showColor()
            this.showIdx = idx
            this.detailItem = ['First Name', 'Last Name', 'Company', 'Phone']
            let userDetail = this.userData[idx]
            let companyName = userDetail.company.name
            let phone = userDetail.phone
            let phoneStart = (phone.split('')[0] === '(') ? phone.split('')[1] : phone.split('')[0]
            let firstName = userDetail.name.split(" ")[0]
            let lastName = userDetail.name.split(" ")[1]
            let dataSet = [firstName, lastName, companyName, phone]
            if (parseInt(phoneStart, 10) === 1) {
                this.styleList.color = 'red'
            } else {
                this.styleList.color = ''
            }
            this.userDetail = dataSet


        },
        deleteData(idx) {
            this.userData.splice(idx, 1)
            this.mailLink.splice(idx, 1)
            if (this.showIdx === idx) {
                this.detailItem = []
                this.userDetail = []
                this.showIdx = ''
                this.showColor()
                    //將原始資料陣列的第幾個el拿掉1個el
            } else if (this.showIdx > idx) {
                this.showIdx -= 1
                this.showColor()
            }

        }


    },
    // mounted() {
    //     this.getData()
    // },
})