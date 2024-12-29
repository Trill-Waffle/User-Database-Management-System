<script>
    import { selectedUserStore, userStore } from './stores';
  
    let selectedUser;
  
    $: selectedUserStore.subscribe((user) => {
      selectedUser = { ...user };
    });
  
    async function updateUser() {
      const res = await fetch(`http://localhost:4000/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });
      const updatedUser = await res.json();
      userStore.update(users =>
        users.map(user => user.id === updatedUser.id ? updatedUser : user)
      );
    }
  </script>
  
  {#if selectedUser}
    <h2>Edit User</h2>
    <form on:submit|preventDefault={updateUser}>
      <input bind:value={selectedUser.name} placeholder="Name" />
      <input bind:value={selectedUser.email} placeholder="Email" />
      <select bind:value={selectedUser.role}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Update User</button>
    </form>
  {:else}
    <p>Select a user to edit.</p>
  {/if}
  