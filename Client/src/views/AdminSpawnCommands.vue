<template>
    <div>
        <div v-for="(text, index) in textsToCopy" :key="index" class="copy-section">
            <!-- <p>{{ text.command }}</p> -->
            <button @click="copyToClipboard(text.command)">{{ text.title }}</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// An array of different texts to be copied
const textsToCopy = ref([{
    title: 'shotgun',
    command: 'cheat gfi PrimalItem_WeaponMachinedShotgun 10 40 0',
},
{
    title: 'shotgun shells',
    command: 'cheat gfi SimpleShotgunBullet 500 1 0',
},
{
    title: 'saddle',
    command: 'cheat gfi ProcoptodonSaddle 1 1 0',
},
{
    title: 'Procoptodon',
    command: 'cheat gmsummon "Procoptodon_Character_BP_C" 60',
},
{
    title: 'heal soup',
    command: 'cheat gfi PrimalItemConsumable_HealSoup 1 1 0',
},
{
    title: 'Flak Helmet',
    command: 'cheat gfi MetalHelmet 2 20 0',
},
{
    title: 'Flak Chestpiece',
    command: 'cheat gfi MetalShirt 2 20 0',
},
{
    title: 'Flak Pants',
    command: 'cheat gfi MetalPants 2 20 0',
},
{
    title: 'Flak Boots',
    command: 'cheat gfi MetalBoots 2 20 0',
},
{
    title: 'Flak Gauntlets',
    command: 'cheat gfi MetalGloves 2 20 0',
},
{
    title: 'Gamma Center',
    command: 'cheat summon bossteleport_Twobosses_spidergorilla_c',
},
{
    title: 'Beta Center',
    command: 'cheat summon bossteleport_twobosses_spidergorilla_medium_c',
},
{
    title: 'Alpha Center',
    command: 'cheat summon bossteleport_twobosses_spidergorilla_hard_c',
},
{
    title: 'Performance Commands',
    command: 'r.VolumetricCloud 0 | r.shadowquality 0 | r.fog 0 | sg.FoliageQuality 0 | r.bloomquality 0 | r.PostProcessing.DisableMaterials 1 | Gamma 3 | grass.Enable 0 | r.Water.SingleLayer.Reflection 0 | r.LightShaftQuality 0 | r.shadowquality 0 | r.VolumetricCloud 0 | r.VolumetricFog 0 | r.BloomQuality 0 | r.Lumen.Reflections.Allow 0 | r.Lumen.DiffuseIndirect.Allow 1 | r.Shadow.Virtual.Enable 0 | r.DistanceFieldShadowing 0 | r.Shadow.CSM.MaxCascades 0 | sg.FoliageQuality 0 | sg.TextureQuality 0 | show InstancedFoliage | show InstancedStaticMeshes | show DynamicShadows | show InstancedGrass | wp.Runtime.HLOD 0 | ark.MaxActiveDestroyedMeshGeoCollectionCount 0 | grass.sizeScale 0 | r.Lumen.DiffuseIndirect.Allow 1 | r.MipMapLODBias 0'
}
]);

// Copy function that takes the text to be copied
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        // alert('Copied: ' + text);
    } catch (err) {
        alert('Failed to copy text: ' + err);
    }
};
</script>

<style scoped>
.copy-section {
    margin-bottom: 15px;
}
</style>
