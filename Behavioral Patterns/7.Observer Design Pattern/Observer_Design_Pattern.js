



class Github {
    constructor(policy) {
        this.developers = [];
        this.policy = policy
    }

    addDeveloper(developer) {
        this.developers.push(developer)
    }

    removeDeveloper(developer_id) {
        this.developers = this.developers.filter((dev) => dev.id !== developer_id);
    }

    updatePolicy() {
        this.developers.forEach((res) => {
            res.policyUpdate(this.policy,res.name)
        })
    }
}

class Developer {
    constructor(name, account_username, repos) {
        this.name = name;
        this.account_username = account_username;
        this.repos = repos;
    }

    policyUpdate(data,user_name) {
        console.log(`Hey ${user_name} Github ${data} Privacy Policy has been changed`)
    }
}
const dev1 = new Developer("dev 99", "dev__99", 99);
const dev2 = new Developer("dev 2", "dev__49", 29);
const dev3 = new Developer("dev 4", "dev__99", 99);


const git = new Github("Github Repo access rate limiting ")

git.addDeveloper(dev1)
git.addDeveloper(dev2)
git.addDeveloper(dev3);

git.updatePolicy()