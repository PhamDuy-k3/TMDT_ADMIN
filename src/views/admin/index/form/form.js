function Form() {
  return (
    <div className="content-wraper content-wraper1">
      <div className="content-wraper-header d-lg-flex">
        <h2>General Form</h2>
        <div className="d-flex content-wraper-header-cl2">
          <a href="">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </a>
          <p>/</p>
          <p className="gray">General Form</p>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid General-Form">
          <div className="quick-Example">
            <div className="quick-Example-header">
              <p>Quick Example</p>
            </div>
            <form action="">
              <div className="quick-Example-content">
                <div className="form-group">
                  <label htmlFor="email">Email address </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pass">Password</label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="file">File input </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="file-box"
                    placeholder="Choose file"
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="checkmeout"
                    id="CheckMeOut"
                    value="Check me out"
                  />
                  Check me out
                </div>
              </div>
              <div className="quick-Example-submit">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
          <div className="different-Styles">
            <div className="different-Styles-header">
              <p>Different Styles</p>
            </div>
            <div className="different-Styles-content">
              <h4>Input</h4>
              <div className="form-group">
                <label htmlFor="exampleInputBoder">
                  Bottom Boder only <code>.form-control-boder</code>
                </label>
                <input
                  type="text"
                  id="exampleInputBoder"
                  placeholder=".form-control-boder"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputBoderWidth2">
                  Bottom Border only 2px Border
                  <code>.form-control-border.border-width-2</code>
                </label>
                <input
                  type="text"
                  id="exampleInputBoderWidth2"
                  placeholder=".form-control-border.border-width-2"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputFlat">
                  Flat <code>.rounded-0</code>
                </label>
                <input
                  type="text"
                  id="exampleInputFlat"
                  placeholder=".rounded-0"
                />
              </div>
              <h4>Custom Select</h4>
              <div className="form-group">
                <label htmlFor="exampleSelectBoder">
                  Bottom Border only <code>.form-control-border</code>
                </label>
                <select name="" id="exampleSelectBoder" placeholder="Value 1">
                  <option value="Value 1">Value 1</option>
                  <option value="Value 2">Value 2</option>
                  <option value="Value 3">Value 3</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelectBoderWidth2">
                  Bottom Border only
                  <code>.form-control-border.border-width-2</code>
                </label>
                <select
                  name=""
                  id="exampleSelectBoderWidth2"
                  placeholder="Value 1"
                >
                  <option value="Value 1">Value 1</option>
                  <option value="Value 2">Value 2</option>
                  <option value="Value 3">Value 3</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelectFlat">
                  Flat <code>.rounded-0</code>
                </label>
                <select name="" id="exampleSelectFlat" placeholder="Value 1">
                  <option value="Value 1">Value 1</option>
                  <option value="Value 2">Value 2</option>
                  <option value="Value 3">Value 3</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-Addon">
            <div className="input-Addon-header">
              <p>Input Addon</p>
            </div>
            <div className="input-Addon-content">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span>@</span>
                </div>
                <input type="text" name="name" placeholder="Usename" />
              </div>
              <div className="input-group">
                <input type="text" />
                <div className="input-group-prepend">
                  <span>.00</span>
                </div>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span>$</span>
                </div>
                <input type="text" id="form-control1" />
                <div className="input-group-prepend">
                  <span>.00</span>
                </div>
              </div>
              <h4>With icons</h4>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span>
                    <i className="far fa-envelope"></i>
                  </span>
                </div>
                <input type="text" name="email" placeholder="Email" />
              </div>
              <div className="input-group">
                <input type="text" />
                <div className="input-group-prepend">
                  <span>
                    <i className="fas fa-check"></i>
                  </span>
                </div>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span>$</span>
                </div>
                <input type="text" id="form-control2" />
                <div className="input-group-prepend">
                  <span>
                    <i className="fas fa-car-side"></i>
                  </span>
                </div>
              </div>
              <h5>With checkbox and radio inputs</h5>
              <div className="input-group">
                <div className="check-input-group-prepend d-flex">
                  <div className="input-group-prepend">
                    <span>
                      <input type="checkbox" />
                    </span>
                  </div>
                  <input type="text" />
                </div>
                <div className="radio-input-group-prepend d-flex">
                  <div className="input-group-prepend">
                    <span>
                      <input type="radio" />
                    </span>
                  </div>
                  <input type="text" />
                </div>
              </div>
              <h5>With buttons</h5>
              <div className="input-group d-lg-flex flex-lg-column">
                <label htmlFor="">
                  Large <code>..input-group.input-group-lg</code>
                </label>
                <div className="select-input1 d-flex">
                  <select>
                    <option value="Action">Action</option>
                    <option value="Action 1">Action 1</option>
                    <option value="Action 2">Action 2</option>
                    <option value="Action 3">Action 3</option>
                  </select>
                  <input type="text" />
                </div>
              </div>
              <div className="input-group d-lg-flex flex-lg-column">
                <label htmlFor="">Normal </label>
                <div className="select-input2 d-flex">
                  <button>Action</button>
                  <input type="text" />
                </div>
              </div>
              <div className="input-group d-lg-flex flex-lg-column">
                <label htmlFor="">
                  Small <code>.input-group.input-group-sm</code>
                </label>
                <div className="select-input3">
                  <input type="text" />
                  <button>Go!</button>
                </div>
              </div>
            </div>
          </div>
          <div className="horizontal-Form">
            <div className="quick-Example">
              <div className="quick-Example-header">
                <p>Horizontal Form</p>
              </div>
              <form action="">
                <div className="quick-Example-content">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="Email"
                      placeholder=" Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass">Password</label>
                    <input
                      type="password"
                      name="pass"
                      id="Pass"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="RememberMe"
                      id="RememberMe"
                      value="RememberMe"
                    />
                    Remember me
                  </div>
                </div>
                <div className="quick-Example-submit">
                  <input type="submit" value="Sign in" />
                  <input type="submit" name="cancel" value="Cancel" />
                </div>
              </form>
            </div>
          </div>
          <div className="float-right">
            <div className="different-Height">
              <div className="different-Height-header">
                <p>Different Height</p>
              </div>
              <div className="different-Height-content">
                <div className="height-input-group1">
                  <input type="text" placeholder=".form-control-lg" />
                </div>
                <div className="height-input-group2">
                  <input type="text" placeholder="Default input" />
                </div>
                <div className="height-input-group3">
                  <input type="text" placeholder=".form-control-sm" />
                </div>
              </div>
            </div>
            <div className="different-Wight">
              <div className="different-Wight-header">
                <p>Different Wight</p>
              </div>
              <div className="different-Wight-content">
                <div className="row col-12">
                  <div className="col-3">
                    <input type="text" placeholder=".col-3" />
                  </div>
                  <div className="col-4">
                    <input type="text" placeholder=".col-4" />
                  </div>
                  <div className="col-5">
                    <input type="text" placeholder=".col-5" />
                  </div>
                </div>
              </div>
            </div>
            <div className="general-Elements">
              <div className="general-Elements-header">
                <p>General Elements</p>
              </div>
              <div className="general-Elements-content">
                <form action="">
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="text">Text</label>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      placeholder="Enter..."
                    />
                  </div>
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="TextDisabled">Text Disabled</label>
                    <input
                      type="text"
                      name="TextDisabled"
                      id="TextDisabled"
                      placeholder="Enter..."
                    />
                  </div>
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="Textarea">Textarea</label>
                    <textarea
                      id="Textarea"
                      rows="4"
                      name="Textarea"
                      placeholder="Enter.."
                    ></textarea>
                  </div>
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="Textarea">Textarea Disabled</label>
                    <textarea
                      disabled
                      rows="4"
                      id="TextareaDisabled"
                      name="TextareaDisabled"
                      placeholder="Enter.."
                    ></textarea>
                  </div>
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="text">
                      <i className="fas fa-check"></i> Input with success
                    </label>
                    <div className="input-icon">
                      <input
                        type="text"
                        name="success"
                        id="success"
                        placeholder="Enter..."
                      />
                      <i className="fas fa-check"></i>
                    </div>
                  </div>
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="text">
                      <i className="far fa-bell"></i> Input with warning
                    </label>
                    <div className="input-icon">
                      <input
                        type="text"
                        name="warning"
                        id="warning"
                        placeholder="Enter..."
                      />
                    </div>
                  </div>
                  <div className="form-group d-flex flex-column">
                    <label htmlFor="text">
                      <i className="far fa-times-circle"></i> Input with error
                    </label>
                    <div className="input-icon">
                      <input
                        type="text"
                        name="error"
                        id="error"
                        placeholder="Enter..."
                      />
                      <i className="fas fa-exclamation-circle"></i>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="d-lg-flex">
                      <div className="checkbox-items">
                        <div className="item-checkbox">
                          <input
                            type="checkbox"
                            name="Checkbox"
                            id="Checkbox"
                            value="Checkbox"
                          />
                          Custom Checkbox
                        </div>
                        <div className="item-checkbox">
                          <input
                            type="checkbox"
                            name="CheckboxChecked"
                            id="CheckboxChecked"
                            value="CheckboxChecked"
                            checked
                          />
                          Custom Checkbox checked
                        </div>
                        <div className="item-checkbox">
                          <input
                            type="checkbox"
                            name="CheckboxDisabled"
                            id="CheckboxDisabled"
                            value="CheckboxDisabled"
                            disabled
                          />{" "}
                          Custom Checkbox disabled
                        </div>
                      </div>
                      <div className="radio-items">
                        <div className="item-radio">
                          <input
                            type="radio"
                            name="radio"
                            id="Radio"
                            value="Radio"
                          />
                          Radio
                        </div>
                        <div className="item-radio">
                          <input
                            type="radio"
                            name="radio"
                            id="RadioChecked"
                            value="RadioChecked"
                            checked
                          />
                          Radio checked
                        </div>
                        <div className="item-radio">
                          <input
                            type="radio"
                            name="RadioDisabled"
                            id="RadioDisabled"
                            value="RadioDisabled"
                            disabled
                          />
                          Radio disabled
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-lg-flex col-lg-12">
                    <div className="form-group d-flex flex-column col-lg-6">
                      <label htmlFor="select">Select Disabled</label>
                      <select
                        name="SelectDisabled"
                        id="SelectDisabled"
                        className="mt-2"
                        disabled
                      >
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                        <option value="option 5">option 5</option>
                      </select>
                    </div>
                    <div className="form-group d-flex flex-column col-lg-6">
                      <label htmlFor="select">Select</label>
                      <select name="" id="" className="mt-2">
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                        <option value="option 5">option 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-lg-flex col-lg-12">
                    <div className="form-group d-flex flex-column col-lg-6">
                      <label htmlFor="select">Select Multiple</label>
                      <select
                        multiple
                        name="SelectMultiple"
                        id="SelectMultiple"
                        className="mt-2"
                      >
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                        <option value="option 5">option 5</option>
                      </select>
                    </div>
                    <div className="form-group d-flex flex-column col-lg-6">
                      <label htmlFor="select">Select Multiple Disabled</label>
                      <select
                        disabled
                        multiple
                        name="SelectMultipleDisabled"
                        id="SelectMultipleDisabled"
                        className="mt-2"
                      >
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                        <option value="option 5">option 5</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="custom-Elements">
              <div className="custom-Elements-header">
                <p>Custom Elements</p>
              </div>
              <div className="custom-Elements-content">
                <form action="">
                  <div className="d-lg-flex col-lg-12">
                    <div className="form-group col-lg-6">
                      <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          name="CustomCheckbox"
                          id="CustomCheckbox"
                          value="CustomCheckbox"
                        />
                        <label htmlFor="CustomCheckbox">Custom Checkbox</label>
                      </div>
                      <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          name="CustomCheckboxChecked"
                          id="CustomCheckboxChecked"
                          value=" CustomCheckboxChecked"
                          checked
                        />
                        <label htmlFor="CustomCheckboxChecked">
                          Custom Checkbox checked
                        </label>
                      </div>
                      <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          name="CustomCheckboxDisabled"
                          id="CustomCheckboxDisabled"
                          value=" CustomCheckboxDisabled"
                          disabled
                        />
                        <label htmlFor="CustomCheckboxDisabled">
                          Custom Checkbox disabled
                        </label>
                      </div>
                      <div className="custom-checkbox custom-color-checkbox">
                        <label htmlFor="CheckboxWithCustomColor">
                          <input
                            type="checkbox"
                            name="CheckboxWithCustomColor"
                            id="CheckboxWithCustomColor"
                            value="CheckboxWithCustomColor"
                            checked
                          />
                          <i className="fas fa-check check-one"></i>
                          Custom Checkbox with custom color
                        </label>
                      </div>
                      <div className="custom-checkbox custom-color-checkbox-outline">
                        <label htmlFor="CheckboxWithCustomColorOutline">
                          <input
                            type="checkbox"
                            name="CheckboxWithCustomColorOutline"
                            id="CheckboxWithCustomColorOutline"
                            value="CheckboxWithCustomColorOutline"
                            checked
                          />
                          <i className="fas fa-check check-two"></i>
                          Custom Checkbox with custom color outline
                        </label>
                      </div>
                    </div>
                    <div className="form-group cusRadio mt-lg-3">
                      <div className="custom-radio">
                        <input
                          type="radio"
                          name="radio"
                          id="CustomRadio"
                          className="form-check-input"
                          value=" CustomRadio"
                        />
                        <label htmlFor="CustomRadio">CustomRadio</label>
                      </div>
                      <div className="custom-radio">
                        <input
                          type="radio"
                          name="radio"
                          id="CustomRadioChecked"
                          className="form-check-input"
                          value="CustomRadioChecked"
                          checked
                        />
                        <label htmlFor="CustomRadioChecked">
                          Custom Radio checked
                        </label>
                      </div>
                      <div className="custom-radio">
                        <input
                          type="radio"
                          name="radio"
                          id="CustomRadioDisabled"
                          value="CustomRadioDisabled"
                          disabled
                        />
                        <label htmlFor="CustomRadioDisabled">
                          Custom Radio disabled
                        </label>
                      </div>
                      <div className="custom-radio custom-color-radio">
                        <label htmlFor="CustomRadioWithCustomColor">
                          <input
                            type="radio"
                            name="radio-color"
                            id="CustomRadioWithCustomColor"
                            checked
                            value=" CustomRadioWithCustomColor"
                          />
                          <i className="far fa-dot-circle dot-one"></i>
                          Custom Radio with custom color
                        </label>
                      </div>
                      <div className="custom-radio custom-color-radio-outline">
                        <label htmlFor="CustomRadioWithCustomColorOutline">
                          <input
                            type="radio"
                            name="radio-color"
                            id="CustomRadioWithCustomColorOutline"
                            value="CustomRadioWithCustomColorOutline"
                          />
                          <i className="far fa-dot-circle dot-two"></i>
                          Custom Radio with custom color outline
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-lg-5">
                    <div className="toggle d-flex">
                      <div className="switch col-2">
                        <input type="checkbox" id="check1" />
                        <label
                          htmlFor="check1"
                          className="slider slider-check1"
                        ></label>
                      </div>
                      <p>Toggle this custom switch element</p>
                    </div>
                    <div className="toggle d-flex">
                      <div className="switch toggle col-2">
                        <input type="checkbox" id="check2" />
                        <label
                          htmlFor="check2"
                          className="slider slider-check2"
                        ></label>
                      </div>
                      <p>
                        Toggle this custom switch element with custom colors
                        danger/success
                      </p>
                    </div>
                    <div className="toggle d-flex">
                      <div className="switch col-2">
                        <input type="checkbox" id="check3" disabled />
                        <label
                          htmlFor="check3"
                          className="slider slider-check3"
                        ></label>
                      </div>
                      <p>Disabled custom switch element</p>
                    </div>
                  </div>
                  <div className="form-group mt-lg-3">
                    <div className="CustomRange">
                      <p>Custom range</p>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value="50"
                        className="silder-ranger ranger1"
                      />
                    </div>
                    <div className="CustomRange">
                      <p>Custom range (custom-range-danger)</p>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value="50"
                        className="silder-ranger ranger2"
                      />
                    </div>
                    <div className="CustomRange">
                      <p>Custom range (custom-range-teal)</p>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value="50"
                        className="silder-ranger ranger3"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Form;
