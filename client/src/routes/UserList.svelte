<script>
    import { onMount } from 'svelte';
    import { userStore, selectedUserStore } from './stores';
  
    let users = [];
  
    // Fetch users on component mount
    onMount(async () => {
      const res = await fetch('http://localhost:4000/users');
      users = await res.json();
      userStore.set(users);
    });
  
    // Select a user to view details or edit
    function selectUser(user) {
      selectedUserStore.set(user);
    }
  </script>
  
  <h2>User List</h2>
  <ul>
    {#each users as user (user.id)}
      <li on:click={() => selectUser(user)}>
        {user.name} ({user.email})
      </li>
    {/each}
  </ul>
  
  <style>
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 8px;
      cursor: pointer;
    }
    li:hover {
      background-color: #eee;
    }
  </style>
  