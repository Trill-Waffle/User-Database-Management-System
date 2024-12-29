<script>
    import UserList from './UserList.svelte';
    import UserDetail from './UserDetail.svelte';
    import UserCreate from './UserCreate.svelte';
    import UserEdit from './UserEdit.svelte';
    import Notification from './Notification.svelte';
</script>
  
  <main>
    <h1>User Management App</h1>
    <Notification />
    <div class="container">
      <div class="left-panel">
        <UserList />
        <UserCreate />
      </div>
      <div class="right-panel">
        <UserDetail />
        <UserEdit />
      </div>
    </div>
  </main>
  
  <style>
    .container {
      display: flex;
      justify-content: space-between;
    }
    .left-panel {
      width: 45%;
    }
    .right-panel {
      width: 45%;
    }
  </style>
  