/*
* 验证规则
* */
export function validateEmail(email) {
    const re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    return re.test(email)
}