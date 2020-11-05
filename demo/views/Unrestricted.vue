<template>
    <div>
        <h1>Unrestricted</h1>

        <router-link :to="{name: 'home'}">
            Back to Home
        </router-link><br>
        <router-link :to="{name: 'restricted', query: {id: 1}}">
            Restricted
        </router-link>
    </div>
</template>