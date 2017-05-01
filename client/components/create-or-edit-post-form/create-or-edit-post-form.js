$(function () {
    var SUCCESS_MESSAGE = 'Материал сохранён успешно';
    var FAIL_MESSAGE = 'Что то пошло не так! Попробуйте сохранить еще разок';

    var formBlock = $('.create-or-edit-post-form');
    var formParams = formBlock.data('params');
    var postForm = $('.create-or-edit-post-form form');
    var postContentEditor = $('#postContent');
    var messagesContainer = $('.create-or-edit-post-form .messages');

    var actionUrl = formParams.isCreateForm ? '/admin/post/new' : '/admin/post/' + formParams.postId + '/update';
    var actionType = formParams.isCreateForm ? 'POST' : 'PUT';

    // init editor
    postContentEditor.trumbowyg({
        lang: 'ru',
        svgPath: '/assets/css/icons.svg'
    });

    postForm.on('submit', submitPostForm);

    function submitPostForm(event) {
        var formData = new FormData(this);

        event.preventDefault();

        $.ajax({
            url: actionUrl,
            type: actionType,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: onPostCreated,
            error: showFailMessage
        })
    }

    function onPostCreated(data, status) {
        if (data.success) {
            resetPostForm();
            showSuccessMessage();
        }
    }

    function resetPostForm() {
        postForm[0].reset();
        postContentEditor.trumbowyg('empty');
    }

    function showMessage(status, text) {
        var messageEl = $('<div class="message">');

        messageEl.addClass('message_' + status);
        messageEl.html(text);

        messagesContainer.append(messageEl);

        setTimeout(function () {
            hideMessage(messageEl);
        }, 5000);
    }

    function hideMessage(messageEl) {
        messageEl.remove();
    }

    function showSuccessMessage() {
        showMessage('success', SUCCESS_MESSAGE);
    }

    function showFailMessage() {
        showMessage('fail', FAIL_MESSAGE);
    }
});


