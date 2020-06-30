<script>

    import {GlobalCSS} from 'figma-plugin-ds-svelte';
    import {Button, Input, Label, SelectMenu, Section} from 'figma-plugin-ds-svelte';
    import style from './css/main.css';

    var percents = 45;
    var innerRadius = 100;
    var outerRadius = 200;
    var types = [
        {'value': 'pie-chart', 'label': 'PieChart', 'group': null, 'selected': true}
    ];

    function create() {
        parent.postMessage({
            pluginMessage: {
                'outerRadius': outerRadius,
                'innerRadius': innerRadius,
				'percents': percents,
				'type': 'PieChart'
            }
        }, '*');
    }

    function cancel() {
        parent.postMessage({pluginMessage: {'type': 'cancel'}}, '*')
    }

</script>


<div class="wrapper p-xxsmall">
    <Section>Select chart type</Section>
    <SelectMenu bind:menuItems={types}/>

    <Section>Graph data</Section>
    <Label>Filled (%)</Label>
    <Input bind:value={percents}/>
    <div class="container">
        <div class="container__inner">
            <Label>Outer radius</Label>
            <Input bind:value={outerRadius}/>
        </div>
        <div class="container__inner">
            <Label>Inner radius</Label>
            <Input bind:value={innerRadius}/>
        </div>
    </div>
    <div class="container mt-24">
        <Button on:click={cancel} variant="secondary">Cancel</Button>
        <Button on:click={create} class="btn-create">Create</Button>
    </div>
</div>

<style></style>
