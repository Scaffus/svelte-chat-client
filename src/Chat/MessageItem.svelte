<script>
    export let message;
    export let userId;

    const time = new Intl.DateTimeFormat("en", {
        timeStyle: "medium",
        dateStyle: "short",
    });

    function formatDate(date) {
        let formated_date = time.format(date);
        return formated_date;
    }
</script>

<div
    class="panel-block no-border"
    class:is-justify-content-right={userId == message.senderId}
    style="border-bottom: none;"
>
    <figure class="image is-32x32">
        <img
            class="is-rounded"
            src="https://www.ui-avatars.com/api/?background=random&name={message.senderName}"
            alt="{message.senderName}'s profile picture"
        />
    </figure>

    <div class="box ml-3 p-3" style="max-width: 70%;">
        <div class="level mb-0">
            <div class="level-item">
                <strong>{message.senderName}</strong>
            </div>

            <div class="level-item ml-1 has-text-grey-light">
                <i>{formatDate(message.date)}</i>
            </div>
        </div>
        <div class:text-right={userId == message.senderId}>
            {message.content}
        </div>
    </div>
</div>

<style>
    .text-right {
        text-align: right;
    }
</style>
