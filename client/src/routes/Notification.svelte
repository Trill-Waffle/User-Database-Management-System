<script>
    import { notificationStore } from './store.js';
  
    let notifications = [];
  
    $: notificationStore.subscribe(n => {
      notifications = n;
    });
  
    function closeNotification(index) {
      notifications.splice(index, 1);
      notificationStore.set([...notifications]);
    }
  </script>
  
  {#if notifications.length > 0}
    <div class="notifications">
      {#each notifications as notification, index}
        <div class="notification">
          <p>{notification.message}</p>
          <button on:click={() => closeNotification(index)}>Close</button>
        </div>
      {/each}
    </div>
  {/if}
  
  <style>
    .notifications {
      position: fixed;
      top: 0;
      right: 0;
      margin: 16px;
    }
    .notification {
      background-color: #333;
      color: #fff;
      padding: 16px;
      margin-bottom: 8px;
      border-radius: 4px;
    }
  </style>
  