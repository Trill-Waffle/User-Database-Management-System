<script>
    import { userStore } from './stores';
  
    let name = '';
    let email = '';
    let role = 'user';
  
    async function createUser() {
      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, role }),
      });
      const newUser = await res.json();
      userStore.update(users => [...users, newUser]);
  
      // Clear the form
      name = '';
      email = '';
      role = 'user';
    }
  </script>
  
  <h2>Create New User</h2>
  <form on:submit|preventDefault={createUser}>
    <input bind:value={name} placeholder="Name" />
    <input bind:value={email} placeholder="Email" />
    <select bind:value={role}>
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
    <button type="submit">Create User</button>
  </form>
  