(function() {
    function updateAttribute(element, attribute, value) {
        if (element.hasAttribute(attribute)) {
            element.setAttribute(attribute, element.getAttribute(attribute).replace("[]", "[" + value + "]"))
        }
    }

    var addStageButton = document.getElementById("add-stage")
    addStageButton.addEventListener("click", function() {
        var stageCount = document.getElementById("stage-count")
        var stageForm = document.getElementById("stage-form-template").cloneNode(true)
        stageForm.setAttribute("id", "stage-form-" + stageCount.value)
        for (var i = 0; i < stageForm.children[0].children.length; i++) {
            var child = stageForm.children[0].children[i]
            updateAttribute(child, "id", stageCount.value)
            updateAttribute(child, "name", stageCount.value)
            updateAttribute(child, "for", stageCount.value)
        }
        document.getElementById("stages").appendChild(stageForm)
        stageCount.value = parseInt(stageCount.value) + 1
    }, false);
})()
