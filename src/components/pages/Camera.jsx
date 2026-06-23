const Camera = () => {

return (
    <>
    <form>
        <label>Press to activate camera.</label>
 <input type="file" accept="image/*" 
        capture="camera" required 
        id="docImg">
 </input>
 </form>
    </>
)
}

export default Camera