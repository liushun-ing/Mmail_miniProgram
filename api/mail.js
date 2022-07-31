import {request} from "./request";

const mail = {
    /**
     * 获取邮件
     */
    getMailList(data) {
        return request({
            url: '/email/getEmail',
            data: data,
            method: 'GET',
        })
    },

    /**
     * 发送邮件
     */
    sendEmail(data) {
        return request({
            url:'/email/sendEmail',
            data: data,
            method: 'POST'
        })
    },

    /**
     * 删除邮件
     */
    deleteEmail(data) {
        return request({
            url: '/email/deleteEmail',
            data: data,
            method: 'POST',
        })
    },

    /**
     * 标星邮件
     */
    setStarEmail(data) {
        return request({
            url:'/email/setStared',
            data: data,
            method: 'POST',
        })
    },

    /**
     * 取消邮件标星
     */
    clearStared(data) {
        return request({
            url: '/email/clearStared',
            data: data,
            method: 'POST'
        })
    },
    
    /**
     * 设置已阅
     */
    setSeen(data) {
        return request({
            url: '/email/setSeen',
            data: data,
            method: 'POST',
        })
    },
    
    /**
     * 存为草稿
     */
    addDraft(data) {
        return request({
            url: '/email/addDraft',
            data: data,
            method: 'POST',
        })
    },

    /**
     * 获取草稿
     */
    getDraft(data) {
        return request({
            url: '/email/getDraft',
            data: data,
            method: 'POST',
        })
    },

    /**
     * 删除草稿
     */
    deleteDraft(data) {
        return request({
            url: '/email/clearDraft',
            data: data,
            method: 'POST',
        })
    },

    updateDraft(data) {
        return request({
            url: '/email/updateDraft',
            data: data,
            method: 'POST'
        })
    },

    /**
     * 获取标星邮件
     */
    getStared(data) {
        return request({
            url: '/email/getStared',
            data: data,
            method: 'GET'
        })
    },

    /**
     * 获取已发送的邮件
     */
    getSentMail(data) {
        return request({
            url: '/email/getSend',
            data: data,
            method: 'GET',
        })
    },

    /**
     * 获取已删除的邮件
     */
    getDeletedMail(data) {
        return request({
            url: '/email/getDeleted',
            data: data,
            method: 'GET',
        })
    },

    /**
     * 撤回删除
     */
    clearDelete(data) {
        return request({
            url: '/email/clearDelete',
            data: data,
            method: 'POST'
        })
    },

    /**
     * 彻底删除
     */
    deleteEmailFinally(data) {
        return request({
            url: '/email/deleteEmailFinally',
            data: data,
            method: 'POST',
        })
    },

    getEmailDetail(data) {
        return request({
            url: '/email/getEmailDetail',
            data: data,
            method: 'GET'
        })
    }
}   

export default mail;