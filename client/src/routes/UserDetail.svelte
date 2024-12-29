<script>
    import { selectedUserStore } from './stores';
  
    let selectedUser;
  
    $: selectedUserStore.subscribe((user) => {
      selectedUser = user;
    });
  </script>
  
  {#if selectedUser}
    <h2>{selectedUser.name}'s Details</h2>
    <p><strong>Email:</strong> {selectedUser.email}</p>
    <p><strong>Role:</strong> {selectedUser.role}</p>
    <button on:click={() => editUser(selectedUser)}>Edit</button>
  {:else}
    <p>Select a user to view details.</p>
  {/if}
  