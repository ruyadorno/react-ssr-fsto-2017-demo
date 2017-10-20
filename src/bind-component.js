import React from 'react';

export default Comp => props => (
  <div data-component={ Comp.displayName }>
    <Comp { ...props }/>
    <script dangerouslySetInnerHTML={{
      __html: `bindComponent.render("${Comp.displayName}");`
    }}>
    </script>
  </div>
);

